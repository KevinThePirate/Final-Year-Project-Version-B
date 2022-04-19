import {
  collection,
  getDocs,
  where,
  doc,
  getDoc,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

export default function VirtualPetHUD(props) {
  const [currentLevelInfo, setCurrentLevelInfo] = useState({});
  const [vpID, setVpID] = useState("");
  const petInfo = props.petInfo;
  const levelInfoCol = collection(db, "levelInfo");
  const moodCol = collection(db, `users/${props.userInfo.uid}/moods`);
  const [moodDisp, setMoodDisp] = useState("");
  const getCurrentLvl = (q) => {
    getDocs(q).then((snapshot) => {
      setCurrentLevelInfo(snapshot.docs[0].data());
    });
  };
  useEffect(() => {
    if (petInfo.level) {
      const currentLevelQ = query(
        levelInfoCol,
        where("level", "==", petInfo.level)
      );
      getDocs(currentLevelQ).then((snapshot) => {
        setCurrentLevelInfo(snapshot.docs[0].data());
      });

      getDocs(moodCol).then((snapshot) => {
        let leng = snapshot.docs.length;
        if (leng < 1) {
          leng = 1;
        }
        //console.log({ leng });
        if (snapshot.docs.length < 1) {
          //console.log("trig");
          setMoodDisp(petInfo.neutral);
        } else {
          const displayImage = query(moodCol, where("index", "==", leng));
          getDocs(displayImage).then((snapshot) => {
            //console.log(snapshot.docs[0].data());
            const displayMood = snapshot.docs[0].data().moodDisp;
            switch (displayMood) {
              case "happy":
                setMoodDisp(petInfo.happy);
                break;
              case "neutral":
                setMoodDisp(petInfo.neutral);
                break;
              case "sad":
                setMoodDisp(petInfo.sad);
                break;
              default:
                setMoodDisp(petInfo.sitting);
            }

            //console.log(snapshot.docs[0].data().moodDisp);
          });
        }
      });
    } else {
      console.log("Waiting...");
    }
    props.petRef.current = expUp;
    return () => {
      // console.log("unsubbing");
    };
  });

  const expUp = (addAmount) => {
    getDocs(props.petCol).then((snapshot) => {
      setVpID(snapshot.docs[0].id);
      //console.log(snapshot.docs[0].id);
      const docRef = doc(
        db,
        `users/${props.userInfo.uid}/virtualPet/${snapshot.docs[0].id}`
      );
      let nextXP = snapshot.docs[0].data().exp + addAmount + 1;
      let levelUp = false;
      if (nextXP >= currentLevelInfo.expRequired) {
        levelUp = true;
        console.log(levelUp);
        nextXP = nextXP - currentLevelInfo.expRequired;
        updateDoc(docRef, {
          exp: nextXP,
          level: currentLevelInfo.level + 1,
        });
      } else {
        updateDoc(docRef, {
          exp: nextXP,
          level: currentLevelInfo.level,
        });
      }
      getDocs(props.petCol).then((snapshot) =>
        props.setPetInfo(snapshot.docs[0].data())
      );
    });
    console.log("Update");
  };
  //const currentLevelInfo = getDocs();
  //const docRef = doc(db, "levelInfo", where("level", "==", petInfo.level));
  //const docSnap = await getDoc(docRef);
  //console.log(docSnap);
  return (
    <main>
      {currentLevelInfo.level ? (
        <div>
          <section>
            {props.petInfo.neutral ? (
              <>
                <p class="triangle-right" id="pet-speaking">
                  <p>How Are You Feeling Today? </p>
                </p>
                <img
                  id="image-display"
                  src={moodDisp}
                  style={{
                    filter: `hue-rotate(${parseInt(
                      props.petInfo.sliderVal
                    )}deg)`,
                  }}
                  alt="Your Virtual Pet"
                />
              </>
            ) : (
              <img src="https://s-media-cache-ak0.pinimg.com/236x/d2/26/a0/d226a076b1079d268f6af79c3f77aa20--baby-huskies-huskies-puppies.jpg" />
            )}
          </section>
          <section>
            <div>Name: {props.petInfo.petName}</div>
            <div>Level: {props.petInfo.level} </div>
            <div>
              Exp: {props.petInfo.exp} / {currentLevelInfo.expRequired}
            </div>
            <div
              id="expBar"
              style={{
                height: "25px",
                border: "1px solid black",
                width: "50%",
                margin: "auto",
                borderRadius: "20px",
              }}>
              {" "}
              <div
                style={{
                  height: "100%",
                  width:
                    (props.petInfo.exp / currentLevelInfo.expRequired) * 100 +
                    "%",
                  background: "#369A96",
                  borderRadius: "20px",
                  transition: "1s",
                }}></div>
            </div>
          </section>
        </div>
      ) : (
        <p>Pet Loading</p>
      )}
    </main>
  );
}
