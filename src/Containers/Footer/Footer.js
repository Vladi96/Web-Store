/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import "./Footer.css";
import UnorderedList from "../../Components/UI/UnorderedList/UnorderedList";

const footer = props => {
  const facebookIcon = (
    <svg viewBox="0 0 24 24" className="Footer-Icon Facebook">
      <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0-2C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm-2 10H8v2h2v6h3v-6h1.8l.2-2h-2v-.8c0-.5.1-.7.6-.7H15V6h-2.4c-1.8 0-2.6.8-2.6 2.3V10z"></path>
    </svg>
  );

  const twitterIcon = (
    <svg className="Footer-Icon Twitter" viewBox="0 0 24 24">
      <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0-2C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm6.5 8.8c-.4.2-.9.3-1.4.4.5-.3.9-.8 1.1-1.4-.5.3-1 .5-1.6.6-.4-.5-1.1-.8-1.8-.8-1.6 0-2.8 1.5-2.4 3-2-.1-3.9-1.1-5.1-2.6-.6 1.2-.3 2.6.8 3.4-.4 0-.8-.1-1.1-.3 0 1.1.8 2.2 2 2.4-.3.1-.7.1-1.1 0 .3 1 1.2 1.7 2.3 1.7-1 .8-2.3 1.2-3.6 1 1.1.7 2.4 1.1 3.8 1.1 4.6 0 7.2-3.9 7-7.3.4-.3.8-.7 1.1-1.2z"></path>
    </svg>
  );

  const instagramIcon = (
    <svg className="Footer-Icon Instagram" viewBox="0 0 45 45">
      <path d="M22.5 3.8c10.3 0 18.7 8.4 18.7 18.7s-8.4 18.7-18.7 18.7S3.8 32.8 3.8 22.5 12.2 3.8 22.5 3.8m0-3.8C10.1 0 0 10.1 0 22.5S10.1 45 22.5 45 45 34.9 45 22.5 34.9 0 22.5 0z"></path>
      <path d="M26.6 11.9h-8.3c-3.8 0-6.9 3.1-6.9 6.9v8.3c0 3.8 3.1 6.9 6.9 6.9h8.3c3.8 0 6.9-3.1 6.9-6.9v-8.3c0-3.8-3.1-6.9-6.9-6.9zm4.9 15.2c0 2.7-2.2 4.8-4.8 4.8h-8.3c-2.7 0-4.8-2.2-4.8-4.8v-8.3c0-2.7 2.2-4.8 4.8-4.8h8.3c2.7 0 4.8 2.2 4.8 4.8v8.3z"></path>
      <path d="M22.5 17.4c-3 0-5.5 2.5-5.5 5.5s2.5 5.5 5.5 5.5S28 26 28 22.9s-2.5-5.5-5.5-5.5zm0 9c-1.9 0-3.4-1.5-3.4-3.4s1.5-3.4 3.4-3.4 3.4 1.5 3.4 3.4c0 1.8-1.5 3.4-3.4 3.4z"></path>
      <circle cx="28.4" cy="17" r=".7"></circle>
    </svg>
  );

  return (
    <>
      <footer className="Footer">
        <UnorderedList
          value={[
            "Products",
            "Dell",
            "Apple",
            "HP",
            "Microsoft",
            "Asus",
            "Acer"
          ]}
        ></UnorderedList>
        <UnorderedList value={["Company", "About", "Contact"]} />
        <UnorderedList
          value={["Connect", facebookIcon, twitterIcon, instagramIcon]}
        />
        <UnorderedList
          value={["Partners", "Dell", "Apple", "BestBuy", "AliExpress"]}
        />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d733.3003066539916!2d23.332092629230228!3d42.69421689869785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8574040c0295%3A0xdc248c275de601a7!2z0J3QsNGA0L7QtNC90L4g0YHRitCx0YDQsNC90LjQtSDQvdCwINCg0LXQv9GD0LHQu9C40LrQsCDQkdGK0LvQs9Cw0YDQuNGP!5e0!3m2!1sbg!2sbg!4v1572628889723!5m2!1sbg!2sbg"
          className="Map"
        ></iframe>
        <p className="CopyRight">
          &copy; Copyright 2019 All Rights Reserved. Vladimir
        </p>
      </footer>
    </>
  );
};

export default footer;
