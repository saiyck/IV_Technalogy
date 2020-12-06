import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Share, View, Image} from 'react-native';
import {SharedElement} from 'react-native-shared-element';
import {Card, Button} from 'react-native-paper';

import {Context} from 'store';
import styles from './newscard-styles';
import {base_url, BLACK, GREEN, linking_url, RED} from 'globals/constants';
import {WIDTH} from 'constants';
import {HEIGHT} from 'constants';
import ScaledImage from 'components/ScaledImage';
function NewsCard(props) {
  const {handlers, state} = React.useContext(Context);
  const [likes, setLikes] = React.useState([]);
  const [comments, setComments] = React.useState([]);
  const is_admin = props.type === 'admin';
  const is_designated = props.type === 'designated';
  const uri = props.id
    ? `${base_url}/public/news/${props.id}.jpeg`
    : 'https://picsum.photos/700';

  React.useEffect(() => {
    getComments();
  }, []);

  function shareNews() {
    Share.share(
      {
        message:`${props.title} \n${linking_url}/news/share/${props.id}`,
        title: props.title,
      },
      {
        dialogTitle: props.title,
      },
    ).then((type) => {
      console.info('SHARED TYPE', type.activityType);
    });
  }

  function toggleLike() {
    handlers.toggleLike(props.id, () => {
      getComments();
    });
  }

  function getComments() {
    handlers.getCommentsLikes(props.id, (res_data) => {
      setComments(res_data.comments);
      setLikes(res_data.likes);
    });
  }

  const i_liked = Boolean(likes.find((x) => x.user_id === state.user.data.id));

  return (
    <TouchableOpacity
      onPress={() => {
        if (!is_admin) {
          props.onSelect(props.index);
        }
      }}>
      <Card style={styles.news_container}>
        <Card.Title title={props.title}/>
        <SharedElement id={`image-${props.index}`}>
          <ScaledImage source={{uri}} />
        </SharedElement>
        <Card.Title subtitle={props.content}
        subtitleNumberOfLines={3}
        subtitleStyle={{color:BLACK,fontFamily:'arial',fontWeight:"500",}}/>
        <Card.Actions style={styles.actions}>
          <View style={styles.user_actions}>
            <Button
              onPress={toggleLike}
              disabled={!state.user.token}
              icon={i_liked ? 'heart' : 'heart-outline'}
              color={GREEN}>
              {likes.length}
            </Button>
            <Button
              style={styles.action_btn}
              icon="comment-outline"
              color={GREEN}
              onPress={() => props.onSelect(props.index)}
            >{comments.length}</Button>
            <Button
              style={styles.action_btn}
              icon="share-variant"
              color={GREEN}
              onPress={shareNews}
            />
          </View>
          <View style={{display: 'flex'}}>
            {is_admin && (
              <Button
                style={styles.action_btn}
                icon="delete"
                color={RED}
                onPress={() => props.onDelete(props.index)}>
                DELETE
              </Button>
            )}
            <Button
              style={styles.action_btn}
              color={GREEN}
              >
              READ MORE
            </Button>
          </View>
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );
}

NewsCard.sharedElements = function (navigation, otherRoute) {
  const index = otherRoute.params.index;
  return [`image-${index}`];
};

NewsCard.propTypes = {
  onSelect: PropTypes.func,
  index: PropTypes.number,
};

NewsCard.defaultProps = {
  title: 'GIRL TOPS EXAMS',
  content: 'a girl from city scores more than 200',
};

export default NewsCard;
