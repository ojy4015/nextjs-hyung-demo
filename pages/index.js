// import { useEffect, useState } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://images.freeimages.com/images/large-previews/e4c/bee-1173616.jpg",
//     address: "Some address 5, 12345 Some City",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://images.freeimages.com/images/large-previews/262/flowers-bees-and-butterflies-1407758.jpg",
//     address: "Some address 10, 12345 Some City",
//     description: "This is a second meetup!",
//   },
// ];

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] =  useState([]);

  // // excute this after component function excuted
  // useEffect(() => {
  //   // send a http request and fetch data

  //   // setLoadedMeetups with the result from backend
  //   setLoadedMeetups(DUMMY_MEETUPS);

  // }, []);

  // return <MeetupList meetups={loadedMeetups} />;

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  // fetch data from an API

  // we don't need to send the request to our own API route, just execute the code here
  // connect db
  const client = await MongoClient.connect(
    "mongodb+srv://dbUser:0iADezfSusnnoT6g@cluster0.oohuv7j.mongodb.net/meetup?retryWrites=true&w=majority"
  );
  //const client = dbConn();

  const db = client.db();

  const meetupCollection = db.collection("meetup");

  const meetups = await meetupCollection.find().toArray(); // all documents array

  client.close();

  return {
    props: {
      // meetups: DUMMY_MEETUPS
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10, // seconds
  };
}

// regenerate this page every incoming request
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
