import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity,Text} from 'react-native';
// import {SharedElement} from 'react-native-shared-element';
import {Card, Button, Paragraph} from 'react-native-paper';
import moment from 'moment';
import RNPrint from 'react-native-print';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import {BLUE, GREEN, RED} from 'globals/constants';
import styles from './meetingcard-styles';

function MeetingCard(props) {
  const [loading, setLoading] = React.useState(false);
  const printPDF= async () => {
    setLoading(true);

    
    const results = await RNHTMLtoPDF.convert({
      html: `<!DOCTYPE html>
      <html lang="te">
  <head>
    <title>sankarnarayana</title>
  </head>
  <body>
    <div>
      <div style="display: flex; justify-content: space-around">
        <div>
          <img
            src="https://scontent.fvtz4-1.fna.fbcdn.net/v/t1.0-9/107375728_100306888425195_5889208180233144652_n.jpg?_nc_cat=110&ccb=2&_nc_sid=09cbfe&_nc_ohc=-Ct8G4yY4CEAX8zl5xV&_nc_ht=scontent.fvtz4-1.fna&oh=da9f6f64369fcf00e51d847e50854b39&oe=5FE6AB45"
            style="
              width: 100px;
              height: 100px;
              border-radius: 50px;
              margin-left: 40px;
            "
          />
          <h2 style="text-align: center; margin-left: -20px; margin-top: 2">
            మాలగుండ్ల<br />
            శంకరనారాయణ
          </h2>
          <p style="text-align: center; margin-left: -20px; margin-top: -20px">
            బి. సి. సంక్షేమస్యాఖ మాత్యులు
          </p>
        </div>
        <div>
          <img
            src="data:image/png;base64,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"
            style="width: 140px; height: 100px; margin-left: 100px"
          />
          <h2 style="margin-top: 2; margin-left: 15">
            వైయస్ఆర్ కాంగ్రెస్ పార్టీ
          </h2>
          <p style="text-align: center; margin-top: -10">ఆంధ్రప్రదేశ్</p>
        </div>
        <div>
          <img
            src="https://www.apindustries.gov.in/RMS/images/CM.png"
            style="
              width: 100px;
              height: 100px;
              border-radius: 50px;
              margin-left: 100px; ;
            "
          />
          <h2 style="margin-top: 2">వై.యస్. జగన్ మోహన్ రెడ్డి</h2>
          <p style="text-align: center; margin-top: -10">
            ఆంధ్రప్రదేశ్ ముఖ్యమంత్రి వర్యులు
          </p>
        </div>
      </div>
      <hr style="margin-top: -5" />
      <h3 style="text-align: center; margin-right: 60px">Appointment Letter</h3>
      <blockquote style="text-align: right">
        <b>Date:&nbsp;</b>${moment(props.scheduled_on).format('DD - MM - YYYY')}
      </blockquote>
      
      <blockquote><b>Shri/Smt:&nbsp;</b>${props.name}</blockquote>

      <div>
        <blockquote style="font-weight: 500">
        <h4>Reason for meet : ${props.title}</h4>
          <small>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            I personally appreciate your concern about our constituency, Please
            consider this meeting as important and share some newideas, I will
            administrate 100% and fulfill our people demands. As per the
            description of your problem, we schedule your appointment time is
            scheduled on
            <b>${moment(props.scheduled_on).format('DD - MM - YYYY')}, ${moment(props.scheduled_on).format('HH:mm')} to ${moment(props.scheduled_on).add(props.duration, 'minutes').format('HH:mm')}</b> I'm sure that your issue
            will be rectified and please come forward for any false allegations
            done by some other party people. Once again thankyou for visit my
            app and share the problem to us.</small
          >
        </blockquote>
        <blockquote style="text-align: right">
          <small>
            with warm Regards,<br />
            <br />
            <u>SIGNATURE</u></small<br /><br />
            <b>Malagundla sankar narayana</b><br />
            MLA of penugonda Assembly
         
        </blockquote>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <hr />
      <footer style="text-align: center">
        <p>
          <b>Email:</b>sankarmalagundla@gmail.com
          <b>Contact Number: </b>+91-9391745699, +91-8559220528
          <a
            href="https://www.facebook.com/Penukonda-Malagundla-Sankara-Narayana-906375772839343"
            target="_blank"
            ><img
              src="https://www.flaticon.com/svg/static/icons/svg/124/124010.svg"
              style="width: 20px; height: 12px"
            />www.facebook.com/malgundlasankarnarayanaofficial</a
          ><a
            href="https://www.instagram.com/mlasankarnarayana/"
            target="_blank"
            ><img
              src="https://www.flaticon.com/svg/static/icons/svg/1409/1409946.svg"
              height="12"
              width="20"
            />https://www.instagram.com/mlasankarnarayana/</a
          ><br />
          <a href="https://twitter.com/SankarNarayana_" target="_blank"
            ><img
              src="https://www.flaticon.com/svg/static/icons/svg/124/124021.svg"
              width="20"
              height="12"
            />https://twitter.com/SankarNarayana_
          </a>

          &nbsp; 23/76, Sainagar, Dharmavaram, Penukonda, Anantapur, Andhra
          Pradesh

          <a href="https://www.ysrcongress.com/"
            >https://www.ysrcongress.com/</a
          >
          PIN Code 515110
        </p>
      </footer>
    </div>
  </body>
</html>  
      `,
      fileName: 'test',
      base64: true,
    });
    setLoading(false);
    await RNPrint.print({filePath: results.filePath});
  };
  return (
    <TouchableOpacity>
      <Card style={styles.container}>
        <Card.Title
          title={props.title}
          subtitle={
            props.name +
            ' / ' +
            moment(props.scheduled_on).format('DD - MM, YYYY')
          }
        />
        <Card.Content>
          <Paragraph>{props.purpose}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.actions}>
        <TouchableOpacity
              style={{alignItems: 'center',
              padding: 10,
              width: 60,
              marginVertical: 10,}}
              onPress={printPDF}>
              <Text style={{color:GREEN}}>PRINT</Text>
              </TouchableOpacity>
              <Button
            color={BLUE}
            onPress={() => props.onSelect('view', props.id)}
            >VIEW</Button>
          <Button
            color={RED}
            onPress={() => props.onSelect('delete', props.id)}>
            CANCEL
          </Button>
          {/* <Button
            icon="pencil"
            color="#1976d2"
            onPress={() => props.onSelect('edit', props.index)}
          /> */}
          
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );
}

// MeetingCard.sharedElements = function (navigation, otherRoute) {
//   const index = otherRoute.params.index;
//   return [`image-${index}`];
// };

MeetingCard.propTypes = {
  onSelect: PropTypes.func,
  index: PropTypes.number,
};

export default MeetingCard;
