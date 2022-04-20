import React from "react";

export default function TutorialSheet() {
  return (
    <div className="core-section">
      <h2>Observo is your new one-stop shop for building healthy habits!</h2>
      <p>We have 3 brand new sections for you to explore</p>
      <ol id="tutorial-list">
        <li>
          <h4>Mood Tracker</h4>
          <li>
            Everyday you can log onto Observo and log how you feel and what
            happened to make you feel that way. Then you can look back over time
            see how your mood has changed overtime and reflect on the logs
            you've written about those days.{" "}
          </li>
        </li>
        <li>
          <h4>Habit Tracker</h4>
          <li>
            Here you can make a list of your habits. What do you do everyday?
            What do you <i>want</i> to do everyday? Walk? Study? Or even play
            video games. Write it all down and cross it off each day.
          </li>
          <li>
            Make sure to take up new habits as well! As you level up your pet
            you'll gain access to more and more programs designed to help you
            make healthy habits a part of your daily life.{" "}
          </li>
        </li>
        <li>
          <h4>Your Virtual Pet</h4>
          <li>
            Get yourself a pet to motivate you on your journey of
            self-improvment. Customise it, name it, make it feel like it's
            yours. As you cross your habits off each day, you'll get EXP to
            level your pet up and gain access to more habit programs.
          </li>
          <li>
            Your pet is very observant. It'll mimic how you feel. If you're
            happy, so is it. But if you're feeling down, so will it. So make
            sure you're keeping on top of your habits so you can keep your
            mental health in tip-top shape!
          </li>
        </li>
      </ol>
      <p>
        To get started swipe to the next slide, name your pet and start
        tracking!
      </p>
    </div>
  );
}
