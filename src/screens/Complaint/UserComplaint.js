import React from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';

import ComplaintCard from 'components/ComplaintCard';
import {Context} from 'store';
import routes from 'navigation/routes';
import Loading from 'components/Loading';

export function UserComplaint(props) {
  const {state, handlers} = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getComplaints();
  }, []);

  function getComplaints() {
    setLoading(true);
    handlers.getComplaints(() => {
      setLoading(false);
    });
  }

  function handleSelect(type, complaint) {
    switch (type) {
      case 'view':
        props.navigation.navigate(routes.single_complaint, complaint);
        break;
    }
  }

  return (
    <View>
      {loading && <Loading />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getComplaints} />
        }>
        {state.user.complaints.map((complaint, i) => (
          <ComplaintCard
            onSelect={handleSelect}
            key={`${JSON.stringify(complaint)}-${i}`}
            index={i}
            complaint={complaint}
          />
        ))}
      </ScrollView>
    </View>
  );
}
