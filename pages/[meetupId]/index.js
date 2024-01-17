// import { Fragment } from "react";
// import MeetupDetail from "../../components/meetups/MeetupDetail";

// function MeetupDetails(props) {
//     return (
//         <MeetupDetail image={props.meetupData.image}
//          title={props.meetupData.title}
//          address={props.meetupData.address}
//          description={props.meetupData.description} />
//     );
// }

// export async function getStaticPaths() {
//     return {
//         fallback: false,
//         paths: [
//             {
//                 params: {
//                     meetupId: 'm1',
//                 },
//             },
//             {
//                 params: {
//                     meetupId: 'm2',
//                 },
//             }
//         ]
//     }
// }

// export async function getStaticProps(context) {
//     const meetupId = context.params.meetupId;
//     console.log('meetupId : ', meetupId);

//     // fetch data from an API for a single meetup

//     return {
//       props: {
//         meetupData: {
//             id: meetupId,
//             image: 'https://images.freeimages.com/images/large-previews/e4c/bee-1173616.jpg',
//             title: 'First Meetup',
//             address: 'some street 5, some city',
//             description: 'This is a first meetup'
//         }
//       },
//       revalidate: 10 // seconds
//     }
//   }

// export default MeetupDetails;

import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name="description"
          content={props.meetupData.description}
        />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  // we don't need to send the request to our own API route, just execute the code here
  // connect db
  const client = await MongoClient.connect(
    "mongodb+srv://dbUser:0iADezfSusnnoT6g@cluster0.oohuv7j.mongodb.net/meetup?retryWrites=true&w=majority"
  );
  //const client = dbConn();

  const db = client.db();

  const meetupCollection = db.collection("meetup");

  const meetups = await meetupCollection
    .find({}, { projection: { _id: 1 } })
    .toArray(); //all documents array of objects, only include _id but no other field values

  console.log("meetups ==> ", meetups);
  //   meetups ==>  [
  //     { _id: new ObjectId('65a61467ca8cf34a1b8b2b81') },
  //     { _id: new ObjectId('65a62983ca8cf34a1b8b2b83') }
  //   ]

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),

    // paths: [
    //     {
    //         params: {
    //             meetupId: 'm1',
    //         },
    //     },
    //     {
    //         params: {
    //             meetupId: 'm2',
    //         },
    //     }
    // ]
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log("meetupId : ", meetupId);

  // fetch data from an API for a single meetup
  // we don't need to send the request to our own API route, just execute the code here
  // connect db
  const client = await MongoClient.connect(
    "mongodb+srv://dbUser:0iADezfSusnnoT6g@cluster0.oohuv7j.mongodb.net/meetup?retryWrites=true&w=majority"
  );
  //const client = dbConn();

  const db = client.db();

  const meetupCollection = db.collection("meetup");

  const selectedMeetup = await meetupCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  console.log("selectedMeetup -> ", selectedMeetup);
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
    revalidate: 10, // seconds
  };
}

export default MeetupDetails;
