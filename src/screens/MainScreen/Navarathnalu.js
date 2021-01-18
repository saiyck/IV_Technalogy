import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
export default class extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={style.container}>
            <View style={style.main}>
              <Image
                source={require('./assets/jagan.jpg')}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 40,
                  //   borderWidth: 4,
                  //   borderColor: '#000',
                }}
              />
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                అన్న కానుక - నవరత్నాలు
              </Text>
              <Text
                style={{color: 'white', textAlign: 'center', marginBottom: 50}}>
                ప్రతి కుటుంబానికి సంవత్సరానికి కనిసం రూ. 1 లక్ష-5 లక్షల వరకు
                లబ్ది
              </Text>
            </View>

            <View style={style.list1}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#3FBA90', '#75D3D0', '#E9A5F6']}
                style={style.gradient}>
                <Image
                  source={require('./assets/raitu.png')}
                  style={style.img}
                />
                <Text style={style.h1}>వైఎస్సార్ రైతు భరోసా</Text>
                <Text style={style.p}>
                  * ప్రతి రైతు కుటుంబానికి ఏటా రూ.12,500. {'\n'}* రైతన్నలకి
                  వడ్డీ లేని పంట రుణాలతో పాటు భీమా ప్రీమియం ప్రభుత్వం ద్వారా
                  చెల్లింపు. {'\n'}* సహకార డెయిరీకి పాలు పొసే వారికి లీటరుకు రూ.
                  4 సబ్సిడీ. {'\n'}* రైతులకు ఉచితంగా బోర్లు, 9 గం. ఉచిత కరెంటు,
                  మరియు వ్యవసాయ ట్రాక్టర్ల రోడ్ టాక్స్ రద్దు. {'\n'}* ప్రతి
                  నియోజకవర్గంలో శీతలీకరణ గిడ్డంగులు, అవసరం మేరకు ఫుడ్
                  ప్రాసెసింగ్ యూనిట్లు. {'\n'}* గిట్టుబాటు ధరల కోసం రూ. 3 వేల
                  కోట్లతో ధరల స్థిరీకరణ నిధి, రూ. 4 వేల కోట్లతో ప్రకృతి
                  విపత్తులు సహాయ నిధి.
                </Text>
              </LinearGradient>
              {/* <Text>
                * పంట బీమా గురించి రైతులు ఆలోచించాల్సిన పనిలేదు. రైతన్న
                చెల్లించాల్సిన బీమా ప్రేమియమ్ మొత్తాన్ని మేమే చెల్లిస్తాం.
              </Text> */}
            </View>
            <View style={style.list2}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#3FBA90', '#75D3D0', '#E9A5F6']}
                style={{
                  borderBottomLeftRadius: 40,
                  borderTopRightRadius: 65,
                  height: 298,
                }}>
                <Image
                  source={require('./assets/doctor.png')}
                  style={style.img}
                />
                <Text style={style.h1}>వైఎస్సార్ ఆరోగ్యశ్రీ</Text>
                <Text style={style.p}>
                  * వ్యాధి ఎదైనా చికిత్స ఖర్చు రూ. 1,000 దాటితే ప్రభుత్వమే
                  చెల్లిస్తుంది. {'\n'}* డబ్బు ఎంతైనా చికిత్స ఎక్కడ
                  చేయించుకున్నా ఆరోగ్యశ్రీ వర్తింపు. {'\n'}* దీర్ఘకాలిక
                  వ్యాధులతో బాధపడుతున్న వారికి ప్రతి నెలా రూ.10,000 పింఛన్.{' '}
                  {'\n'}* చికిత్స తరువాత విశ్రాంతి సమయంలో ఆర్ధిక సహాయం.
                </Text>
              </LinearGradient>
            </View>
            <View style={style.list3}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#3FBA90', '#75D3D0', '#E9A5F6']}
                style={{
                  borderBottomLeftRadius: 40,
                  borderTopRightRadius: 65,
                  height: 168,
                }}>
                <Image
                  source={require('./assets/nofee.png')}
                  style={style.img}
                />
                <Text style={style.h1}>ఫీజు రీయింబర్స్ మెంట్</Text>
                <Text style={style.p}>
                  * పేదవారి చదువుకు అయ్యే ఖర్చును పూర్తిగా భరిస్తాం. {'\n'}*
                  పూర్తి ఫీజు రీయింబర్స్మెంట్ తో పాటు వసతి, భోజనం కోసం అదనంగా
                  ఏటా ప్రతి విద్యార్ధికి రూ. 20000.
                </Text>
              </LinearGradient>
            </View>
            <View style={style.list4}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#3FBA90', '#75D3D0', '#E9A5F6']}
                style={{
                  borderBottomLeftRadius: 50,
                  borderTopRightRadius: 50,
                  height: 178,
                }}>
                <Image
                  source={require('./assets/ammavodi.png')}
                  style={style.img}
                />
                <Text style={style.h1}>అమ్మఒడి</Text>
                <Text style={style.p}>
                  * పిల్లల చదువులకు ఏ పేదింటి తల్లీ భయపడొద్దు. {'\n'}* పిల్లలని
                  బడికి పంపితే చాలు ప్రతి తల్లికి సంవత్సరానికి రూ. 15,000
                  ఇస్తాం.
                </Text>
              </LinearGradient>
            </View>
            <View style={style.list5}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#3FBA90', '#75D3D0', '#E9A5F6']}
                style={{
                  borderBottomLeftRadius: 40,
                  borderTopRightRadius: 65,
                  height: 198,
                }}>
                <Image
                  source={require('./assets/pension.png')}
                  style={style.img}
                />
                <Text style={style.h1}>పింఛన్ల పెంపు</Text>
                <Text style={style.p}>
                  * ప్రస్తుతం ఉన్న పింఛన్ల అర్హత వయస్సు 65 నుంచి 60కి తగ్గించి,
                  వృద్దులకు పింఛన్ రూ. 3,000 వరకు పెంచుకుంటూ పోతాం.
                  {'\n'}* వికలాంగులకు పింఛన్ రూ. 3,000 ఇస్తాం.
                </Text>
              </LinearGradient>
            </View>
            <View style={style.list6}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#3FBA90', '#75D3D0', '#E9A5F6']}
                style={{
                  borderBottomLeftRadius: 40,
                  borderTopRightRadius: 65,
                  height: 268,
                }}>
                <Image
                  source={require('./assets/aasara.png')}
                  style={style.img}
                />
                <Text style={style.h1}>వైఎస్సార్ ఆసరా</Text>
                <Text style={style.p}>
                  * పొదుపు సంఘాల రుణాల మొత్తం సొమ్మును 4 దఫాలుగా నేరుగా వారి
                  చేతికే అందిస్తాం. {'\n'}* సున్నా వడ్డీకే రుణాల విప్లవం తెస్తాం
                  ఆ వడ్డీ డబ్బు ప్రభుత్వమే బ్యాంక్ లకు కడుతుంది. {'\n'}* 45
                  నుండి 60 నంవత్సరాల లోపు బీసీ ,ఎస్సి, ఎస్టీ మైనార్టీఅక్కలకు రూ.
                  వేలు దశలవారిగా ఆయా కార్పొరేషన్లా ద్వారా ఇస్తాం.
                </Text>
              </LinearGradient>
            </View>
            <View style={style.list7}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#3FBA90', '#75D3D0', '#E9A5F6']}
                style={{
                  borderBottomLeftRadius: 40,
                  borderTopRightRadius: 65,
                  height: 318,
                }}>
                <Image
                  source={require('./assets/job.png')}
                  style={style.img}
                />
                <Text style={style.h1}>యువత-ఉపాధి</Text>
                <Text style={style.p}>
                  * మంది స్థానిక యువతకి గ్రామా సచివాలయంలో ప్రభుత్వ ఉద్యోగాలు.
                  ప్రభుత్వ పథకాల డోర్ డెలివరీ కోసం రూ.5000 గౌరవ వేతనంతో ప్రతి 50
                  ఇళ్లకు ఒక గ్రామా వాలంటీర్ నియామకం.{'\n'}*రాష్ట్రంలో ఖాళీగా
                  ఉన్న దాదాపు 2 లక్షల ఉద్యోగాల భర్తీ.{'\n'}* పరిశ్రమల్లో 75%
                  ఉద్యోగాలు స్థానికులకే ఇచ్చేలా చట్టాన్ని తెస్తాం. {'\n'}*
                  ప్రత్యెక హోదా సాదించి ఉద్యోగాలు విప్లవం తెస్తాం.
                </Text>
              </LinearGradient>
            </View>
            <View style={style.list8}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#3FBA90', '#75D3D0', '#E9A5F6']}
                style={{
                  borderBottomLeftRadius: 40,
                  borderTopRightRadius: 65,
                  height: 248,
                }}>
                <Image
                  source={require('./assets/house.png')}
                  style={style.img}
                />
                <Text style={style.h1}>వైఎస్సార్ గృహ నిర్మాణం </Text>
                <Text style={style.p}>
                  * ఇల్లు లేని పేదలందరికీ పక్కా ఇళ్ళు.{'\n'}* ఐదేళ్లలో 25 లక్షల
                  ఇళ్ళు కట్టిస్తాం.{'\n'}* ఇల్లు ఇచ్చే రోజునే ఆ ఇంట్లోని అక్క
                  చెల్లమ్మల పేరుతో రిజిష్ట్రేషన్. {'\n'}* అంతేకాదు డబ్బు
                  అవసరమైతే అదే ఇంటిమీద పావలా వడ్డీకే రుణం వచ్చేట్టుగా బ్యాంక్
                  లతో మాట్లాడుతాం.
                </Text>
              </LinearGradient>
            </View>
            <View style={style.list9}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#3FBA90', '#75D3D0', '#E9A5F6']}
                style={{
                  borderBottomLeftRadius: 40,
                  borderTopRightRadius: 65,
                  height: 168,
                }}>
                <Image source={require('./assets/bc.png')} style={style.img} />
                <Text style={style.h1}>బీసీ సంక్షేమం</Text>
                <Text style={style.p}>
                  * బీసీ ,ఎస్సి, ఎస్టీ మైనారిటీలకు నామినేటెడ్ పదవుల్లో,
                  నామినేషన్ పనుల్లో 50% రిజర్వేషన్. {'\n'}* బీసీల సంక్షేమం కోసం
                  ఏటా కోట్లు,ఏళ్ళలో రూ. కోట్లు
                </Text>
              </LinearGradient>
            </View>
            <View style={style.list10}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#3FBA90', '#75D3D0', '#E9A5F6']}
                style={{
                  borderBottomLeftRadius: 40,
                  borderTopRightRadius: 65,
                  height: 218,
                }}>
                <Image
                  source={require('./assets/noliquior.png')}
                  style={style.img}
                />
                <Text style={style.h1}>మద్యపాన నిషేధం</Text>
                <Text style={style.p}>
                  * కాపురాల్లో మద్యం చిచ్చుపెడుతోంది.మానవ సంబంధాలు
                  ధ్వంసమైపోతున్నాయి.
                  {'\n'}* అందుకే అధికారంలోకి వచ్చిన తరువాత మూడు దశల్లో మద్యాన్ని
                  నిషేధిస్తాం, మద్యాన్ని 5 స్టార్ హోటల్స్ కి మాత్రమే పరిమితం
                  చేస్తాం.
                </Text>
              </LinearGradient>
            </View>
            <View style={style.list11}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#3FBA90', '#75D3D0', '#E9A5F6']}
                style={{
                  borderBottomLeftRadius: 40,
                  borderTopRightRadius: 65,
                  height: 248,
                }}>
                <Image
                  source={require('./assets/water.png')}
                  style={style.img}
                />
                <Text style={style.h1}>వైఎస్సార్ జలయజ్ఞం</Text>
                <Text style={style.p}>
                  * దివంగత మహానేత వై ఎస్ ఆర్ కలలు కన్న జల యజ్ఞాన్ని పూర్తి
                  చేస్తాం. {'\n'}* పోలవరం, పూలసుబ్బయ్య, వెలిగొండ సహా అన్ని
                  ప్రాజెక్టులను యుద్ధ ప్రాతిపదికన పూర్తి చేస్తాం.{'\n'}* రక్షిత
                  మంచినీరు – సాగునీరు కల నిజం చేస్తాం. చెరువులను
                  పునరుద్దరిస్తాం, జలకళను తీసుకోస్తాం.{' '}
                </Text>
              </LinearGradient>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    borderWidth: 1,
    height: 120,
    marginTop: 50,
    width: 380,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    fontSize: 18,
    backgroundColor: 'darkblue',
  },
  list1: {
    height: 400,
    width: 380,
    borderWidth: 1,

    marginBottom: 50,
    // alignItems: 'center',

    // backgroundColor: '',
    borderBottomLeftRadius: 40,
    // borderColor: '#02f578',
    borderTopRightRadius: 65,
  },
  gradient: {
    borderBottomLeftRadius: 40,
    borderTopRightRadius: 65,
    height: 397.5,
  },
  list2: {
    height: 300,
    width: 380,
    borderWidth: 1,
    // alignItems: 'center',
    marginBottom: 50,
    borderBottomLeftRadius: 40,
    borderTopRightRadius: 65,
    // backgroundColor: 'orange',
  },
  list3: {
    height: 170,
    width: 380,
    marginBottom: 50,
    borderWidth: 1,

    // alignItems: 'center',
    // backgroundColor: 'teal',
    borderBottomLeftRadius: 40,
    borderTopRightRadius: 65,
  },
  list4: {
    height: 180,
    width: 380,
    borderWidth: 1,
    marginBottom: 50,
    // backgroundColor: 'red',
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  list5: {
    height: 200,
    width: 380,
    borderWidth: 1,
    marginBottom: 50,
    // backgroundColor: '#0294f5',
    borderBottomLeftRadius: 40,
    borderTopRightRadius: 65,
  },
  list6: {
    height: 270,
    width: 380,
    borderWidth: 1,
    marginBottom: 50,
    // backgroundColor: 'darkred',
    borderBottomLeftRadius: 40,
    borderTopRightRadius: 65,
  },
  list7: {
    height: 320,
    width: 380,
    borderWidth: 1,
    marginBottom: 50,
    // backgroundColor: 'green',
    borderBottomLeftRadius: 40,
    borderTopRightRadius: 65,
  },
  list8: {
    height: 250,
    width: 380,
    borderWidth: 1,
    marginBottom: 50,
    // backgroundColor: '#f50041',
    borderBottomLeftRadius: 40,
    borderTopRightRadius: 65,
  },
  list9: {
    height: 170,
    width: 380,
    borderWidth: 1,
    // backgroundColor: '#400180',
    marginBottom: 50,
    borderBottomLeftRadius: 40,
    borderTopRightRadius: 65,
  },
  list10: {
    height: 220,
    width: 380,
    borderWidth: 1,
    // backgroundColor: '#f5d50a',
    marginBottom: 50,
    borderBottomLeftRadius: 40,
    borderTopRightRadius: 65,
  },
  list11: {
    height: 250,
    width: 380,
    borderWidth: 1,
    // backgroundColor: '#518001',
    marginBottom: 20,
    borderBottomLeftRadius: 40,
    borderTopRightRadius: 65,
  },
  h1: {
    fontSize: 22,
    padding: 10,
    marginTop: 30,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    textAlign: 'center',
    color: '#000',
  },
  p: {
    fontSize: 16,
    textAlign: 'justify',
    padding: 5,
    color: '#ffffff',
  },
  img: {
    height: 75,
    width: 75,
    borderRadius: 37.5,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#000',
    position: 'absolute',
    top: -40,

    alignSelf: 'center',
  },
});
