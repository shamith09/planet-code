import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import PersonCoding from './SVGS/PersonCoding';
import ProgrammerThinking from './SVGS/ProgrammerThinking';
import Creative from './SVGS/Creative';
import Office from './SVGS/Office';

const Landing = () => {
    return (
        <section id="intro" style={{ display: 'block', margin: 'auto' }}>
            <div className="row">
                <div
                    className="col text-center left-side"
                    style={{ marginLeft: '10%' }}
                >
                    <h1 className="name">Planet Code</h1>
                    <h1 className="subtext">
                        An intuitive learning solution to learning algorithms in
                        a fun and entertaining fashion
                    </h1>
                    <Link to="/practice" style={{ textDecoration: 'none' }}>
                        <button className="uk-button uk-button-primary get-started">
                            Get Started
                        </button>
                    </Link>
                </div>
                <div className="col right-side" style={{ marginLeft: '5%' }}>
                    <PersonCoding />
                </div>
            </div>
            <div className="row" style={{ marginTop: '15%' }}>
                <div className="col" style={{ marginLeft: '5%' }}>
                    <ProgrammerThinking />
                </div>
                <div
                    className="col center"
                    style={{ marginLeft: '5%', paddingRight: '5%' }}
                >
                    <h1 className="caption">
                        Learn how to think like a programmer
                    </h1>
                    <p className="sub-caption">
                        To master programming, you first need to master how to
                        think like a programmer. Thinking in terms of algorithms
                        teaches us this.
                    </p>
                </div>
            </div>
            <div className="row" style={{ marginTop: '10%' }}>
                <div
                    className="col"
                    style={{
                        marginLeft: '5%',
                        paddingRight: '5%',
                        marginTop: '10%',
                    }}
                >
                    <h1 className="caption">Land your dream programming job</h1>
                    <p className="sub-caption">
                        An adept understanding of data structures and algorithms
                        is fundamental to crushing the coding interview and
                        getting your dream job.
                    </p>
                </div>
                <div className="col center">
                    <Office />
                </div>
            </div>
            <div className="row" style={{ marginTop: '10%' }}>
                <div className="col" style={{ marginLeft: '10%' }}>
                    <Creative />
                </div>
                <div
                    className="col center"
                    style={{
                        marginLeft: '5%',
                        paddingRight: '5%',
                        marginTop: '7%',
                    }}
                >
                    <h1 className="caption">
                        Build your problem solving abilities
                    </h1>
                    <p className="sub-caption">
                        Programming is a puzzle and you need to solve it to
                        reach your solution. Learning algorithms gives you a
                        backbone in how you approach your solution.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Landing;
