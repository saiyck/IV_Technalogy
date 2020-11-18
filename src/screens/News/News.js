import React from 'react';
import {ScrollView, RefreshControl} from 'react-native';

import {Context} from 'store';
import NewsCard from 'components/NewsCard';
import routes from 'navigation/routes';
import Loading from 'components/Loading';

function News(props) {
  const {state, handlers} = React.useContext(Context);
  const [loading, setLoading] = React.useState(true);

  function handleSelect(news) {
    props.navigation.navigate(routes.single_news, news);
  }

  React.useEffect(() => {
    handlers.getNews(() => {
      setLoading(false);
    });
  }, []);

  function getNews() {
    setLoading(true);
    handlers.getNews(() => {
      setLoading(false);
    });
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getNews} />
      }>
      {loading && <Loading />}
      {state.news.map((news, i) => (
        <NewsCard
          onSelect={() => handleSelect(news)}
          key={`${JSON.stringify(news)}-${i}`}
          index={i}
          {...news}
        />
      ))}
    </ScrollView>
  );
}

export default News;
