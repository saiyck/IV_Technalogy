import React from 'react';
import {View, Share, FlatList, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import {
  Card,
  Paragraph,
  IconButton,
  FAB,
  List,
  TextInput,
  Button,
  Portal,
  Modal,
} from 'react-native-paper';

import styles from './singlenews-styles';
import {base_url, GREEN, linking_url, RED} from 'globals/constants';
import {Context} from 'store';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {HEIGHT} from 'constants';

function SingleNews(props) {
  let {title, content, id} = props.route.params;
  const {handlers, state} = React.useContext(Context);
  const [comments, setComments] = React.useState([]);
  const [comment, setComment] = React.useState(null);
  const [likes, setLikes] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    getComments();
  }, []);

  function addComment() {
    if (comment && id && comment !== '') {
      handlers.createComment({news_id: id, comment}, () => {
        setComment(null);
        getComments();
      });
    } else {
      alert('FIELDS ARE MISSING!');
      console.info('FIELDS', {comment, id});
    }
  }

  function toggleLike() {
    handlers.toggleLike(id, () => {
      getComments();
    });
  }

  function getComments() {
    handlers.getCommentsLikes(id, (res_data) => {
      setComments(res_data.comments);
      setLikes(res_data.likes);
    });
  }

  function deleteComment(comment_id) {
    handlers.deleteComment(comment_id, () => {
      getComments();
    });
  }

  const i_liked = Boolean(likes.find((x) => x.user_id === state.user.data.id));

  const uri = id
    ? `${base_url}/public/news/${id}.jpeg`
    : 'https://picsum.photos/700';

  function shareNews() {
    Share.share(
      {
        message: `${title} \n${linking_url}/news/share/${id}`,
        title,
      },
      {
        dialogTitle: title,
      },
    ).then((type) => {
      console.info('SHARED TYPE', type.activityType);
    });
  }

  return (
    <>
      <Portal>
        <Modal visible={open} onDismiss={() => setOpen(false)}>
          <Image
            source={{uri}}
            style={{height: HEIGHT / 2}}
            resizeMode="contain"
          />
          <Button color={RED} mode="contained" onPress={() => setOpen(false)}>
            CLOSE
          </Button>
        </Modal>
      </Portal>
      <FlatList
        ListHeaderComponent={
          <>
            <Card style={styles.news_container}>
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Card.Cover source={{uri}} />
              </TouchableOpacity>
              <Card.Title title={title} 
              titleNumberOfLines={2}
              titleStyle={{fontSize:18}}/>
              <Card.Content>
                <Paragraph>{content}</Paragraph>
              </Card.Content>
            </Card>
            <View style={styles.comment_box}>
              <TextInput
                onChangeText={setComment}
                style={styles.field}
                value={comment}
                theme={{
                  colors:{
                    primary:GREEN
                  }
                }}
                label="ADD A COMMENT"
              />
              <View style={styles.actions_ctr}>
                <Button
                  onPress={toggleLike}
                  disabled={!state.user.token}
                  icon={i_liked ? 'heart' : 'heart-outline'}
                  color={GREEN}>
                  {likes.length}
                </Button>
                <Button
                  disabled={!state.user.token || !comment}
                  icon="plus"
                  color={GREEN}
                  onPress={addComment}>
                  ADD COMMENT
                </Button>
              </View>
            </View>
            <FAB style={styles.fab} icon="share" onPress={shareNews} />
            <Text style={styles.header}>COMMENTS</Text>
          </>
        }
        data={comments}
        keyExtractor={(item) => JSON.stringify(item)}
        renderItem={({item}) => (
          <List.Item
            title={item.user_name ? item.user_name : 'UNKNOWN'}
            description={item.comment}
            right={() => {
              return state.user.data.id === item.user_id ? (
                <IconButton
                  icon="delete"
                  color={RED}
                  onPress={() => deleteComment(item.id)}
                />
              ) : (
                <View />
              );
            }}
          />
        )}
      />
    </>
  );
}

SingleNews.sharedElements = (route, ...others) => {
  const index = route.params.index;
  return [`image-${index}`];
};

SingleNews.propTypes = {
  handleSelect: PropTypes.func,
  index: PropTypes.number,
};

export default SingleNews;
