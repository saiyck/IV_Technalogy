import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
export default class About extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Image style={styles.img} source={require('./assets/covers.png')} />
            <View>
              <Text style={styles.h1}>మాలాగుండ్ల శంకరనారాయణ</Text>
              <Text style={styles.p}>
                మలగుండ్ల శంకరనారాయణ రహదారులు మరియు భవనములు శాఖ మంత్రి మరియు
                వైయస్ఆర్సిపి పార్టీ నుండి పెనుకొండ నియోజకవర్గ శాసనసభ (ఎమ్మెల్యే)
                సభ్యుడు. అతను 01-04-1965 న పెద్దాయ్య మరియు యశోదమ్మ దంపతులకు
                జన్మించాడు.{'\n'}
                {/* </Text>
              <Text style={styles.p}> */}
                అతను 1986 లో గుంటూరులోని నాగార్జునసాగర్ లోని A.P. రెసిడెన్షియల్
                డిగ్రీ కళాశాల నుండి B.Com పూర్తి చేసాడు. అతను 1989 లో బెంగళూరు
                విశ్వవిద్యాలయంలోని SJ రేణుకాచార్య కళాశాల నుండి LLB పూర్తి
                చేశాడు. అతను వృత్తి ద్వారా న్యాయవాది. ఎం. జయలక్ష్మికి ఒక
                కుమారుడు, కుమార్తె ఉన్నారు. శంకరనారాయణ 1995 లో తెలుగు దేశమ్
                పార్టీలో చేరడం ద్వారా రాజకీయ ప్రవేశం ప్రారంభించారు.{'\n'}2005 లో
                ధర్మవరం మునిసిపల్ కౌన్సిలర్ అయ్యారు.అతను 2011 లో వైయస్ఆర్
                కాంగ్రెస్ పార్టీలో చేరాడు. 2014 అసెంబ్లీ ఎన్నికలలో, అతను
                పెనుకొండ సీట్ల నుండి పోటీ చేశాడు, టిడిపికి చెందిన బి కె
                పార్థసారథి 17,415 మార్జిన్లతో ఓడిపోయాడు. కానీ 2019 ఎన్నికల్లో
                ఆయన ఎమ్మెల్యేగా ఎన్నికై క్యాబినెట్ మంత్రి పదవి పొందారు. రహదారులు
                మరియు భవనములు శాఖ మంత్రిగా పనిచేస్తున్నారు. అతను 2012 నుండి
                అనంతపూర్ జిల్లా వైయస్ఆర్సిపి అధ్యక్షుడిగా కొనసాగుతున్నాడు. జూలై
                22 న ఆయనకు కేబినెట్ పునర్నిర్మాణంలో రోడ్లు మరియు భవనాల శాఖగా
                కేటాయించారు.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  img: {
    height: 145,
    width: '100%',
  },
  h1: {
    fontSize: 23,
    padding: 10,
    // marginTop: 30,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    // borderWidth: 20,
    // borderBottomColor: '',
    // textAlign: 'center',
    color: '#000',
  },
  p: {
    fontSize: 16,
    textAlign: 'justify',
    padding: 10,
    lineHeight: 30,

    // letterSpacing: 15,
    // color: '#ffffff',
  },
});
