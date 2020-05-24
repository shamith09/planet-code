import React from 'react';
import './styles.css';

const About = () => {
    return (
        <div className="container">
            <h1 className="about">About</h1>
            <p className="subText" style={{ 'padding-top': '3%' }}>
                Planet Code is created to tackle the deprivation of education in
                the rapidly growing computer science field. We hope that people
                can begin their programming journies and gain a life long
                interest in computer science through a hands-on learning
                process.{' '}
            </p>
            <br />
            <p className="subText">
                We created Planet Code as a tool designed to assist in the
                learning process and provide an accurate benchmark of users’
                abilities. Users are able to test their overall understanding of
                basic programming concepts by completing problems that get
                gradually more difficult. If they are stuck, they can view the
                “hints” and learn more about the specific concepts they need
                help on.{' '}
            </p>
        </div>
    );
};

export default About;
