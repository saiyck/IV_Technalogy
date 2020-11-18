import React from 'react';
import {View, ScrollView, Alert, RefreshControl} from 'react-native';
import {FAB} from 'react-native-paper';

import {Context} from 'store';
import NewsCard from 'components/NewsCard';
import routes from 'navigation/routes';

import styles from './news-style';
import Loading from 'components/Loading';

export function UserNews(props) {
  const {state, handlers} = React.useContext(Context);
  const [loading, setLoading] = React.useState(true);

  function handleSelect(index) {
    if (index === 'create') {
      props.navigation.navigate(routes.create_news);
      return;
    }
    props.navigation.navigate(routes.single_news, index);
  }

  function handleDelete(news) {
    Alert.alert('DELETE', 'CONFIRM DELETE NEWS?', [
      {
        text: 'DELETE',
        onPress: () =>
          handlers.deleteNews(news.id, () => {
            getAllNews();
          }),
        style: 'destructive',
      },
      {
        text: 'CANCEL',
        style: 'cancel',
      },
    ]);
  }

  React.useEffect(() => {
    handlers.getAllNews(() => {
      setLoading(false);
    });
  }, []);

  function getAllNews() {
    setLoading(true);
    handlers.getAllNews(() => {
      setLoading(false);
    });
  }

  return (
    <View style={styles.news_container}>
      {loading && <Loading />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getAllNews} />
        }>
        {state.user.news.map((news) => (
          <NewsCard
            type="admin"
            onSelect={() => handleSelect(news)}
            onDelete={() => handleDelete(news)}
            {...news}
          />
        ))}
      </ScrollView>
      <FAB
        style={styles.fab}
        color="white"
        icon="plus"
        onPress={() => handleSelect('create')}
      />
    </View>
  );
}
