import React, { useState } from 'react';
import './styles.css';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { useSelector } from 'react-redux';
import axios from 'axios';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');
require('codemirror/mode/python/python.js');

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
};

const options = {
    mode: 'python',
    theme: 'material',
    lineNumbers: true,
    scrollbarStyle: null,
};

const Editor = (props) => {
    const user = useSelector((state) => state.auth.user);
    const [value, setValue] = useState();
    const [token, setToken] = useState();
    const [currentLanguage, setCurrentLanguage] = useState(0);
    const [selectionValue, setCollectionValue] = useState();
    const [expectedOutput, setExpectedOutput] = useState(props.expected);
    const [questionName, setQuestionName] = useState(props.questionName);
    const [questionDescription, setQuestionDescription] = useState(
        props.questionDescription
    );
    const [questionId, setQuestionId] = useState(props.id);

    const submitCode = async () => {
        let token = '';

        // Get coding language selected
        let e = document.getElementById('language-selector');
        var language_num = e.options[e.selectedIndex].value;
        var language = 0;
        if (language_num == 1) {
            // Python
            language = 71;
        } else if (language_num == 2) {
            // Javascript
            language = 63;
        } else if (language_num == 3) {
            // C++
            language = 54;
        } else if (language_num == 4) {
            // C#
            language = 51;
        } else if (language_num == 5) {
            // Java
            language = 62;
        }

        const reqBody = {
            source_code: value,
            language_id: language,
        };

        if (expectedOutput != '') {
            reqBody.expected_output = expectedOutput;
        }

        // Request to submit source code and langauge, start compilation
        await axios
            .post(
                'https://cors-anywhere.herokuapp.com/https://api.judge0.com/submissions/?base64_encoded=false&wait=false',
                reqBody
            )
            .then(
                (response) => {
                    console.log(response);
                    setToken(response.data.token);
                },
                (error) => {
                    console.log(error);
                }
            );

        setTimeout(compileCode, 3000);
    };

    const compileCode = async () => {
        let statusCode = -1;

        let COMPILE_URL =
            'https://cors-anywhere.herokuapp.com/https://api.judge0.com/submissions/' +
            token +
            '?base64_encoded=false&fields=stdout,stderr,status_id,language_id';
        await axios.get(COMPILE_URL, config).then(
            (response) => {
                changeOutput(response.data.stdout);
                statusCode = response.data.status_id;
            },
            (error) => {
                console.log(error);
            }
        );
        if (statusCode === 1) {
            console.log('In Queue');
        }
        if (statusCode === 2) {
            console.log('Processing');
        }
        if (statusCode === 3) {
            if (expectedOutput != '') {
                questionCorrect();
                changeDebug('Your answer was correct.');
            } else {
                changeDebug('Your program compiled and ran successfully.');
            }
        }
        if (statusCode === 4) {
            console.log('Wrong Answer');
            changeDebug('Your answer was incorrect.');
        }
        if (statusCode === 5) {
            console.log('Time Limit Exceeded');
            changeOutput('Error.');
            changeDebug('The time limit was exceeded.');
        }
        if (statusCode === 6) {
            console.log('Compilation Error');
            changeOutput('Error.');
            changeDebug('Error during compiling.');
        }
        if (statusCode >= 7 && statusCode <= 12) {
            console.log('Runtime Error');
            changeOutput('Error.');
            changeDebug('Runtime error occured.');
        }
        if (statusCode === 13) {
            console.log('Internal Error');
            changeOutput('Error.');
            changeDebug('Internal error occured.');
        }
        if (statusCode === 14) {
            console.log('Exec Format Error');
            changeOutput('Error.');
            changeDebug('Exec format error occured.');
        }
    };

    const changeOutput = (o) => {
        document.getElementById('output-box').value = o;
    };

    const changeDebug = (o) => {
        document.getElementById('debug-box').value = o;
    };

    const runCode = () => {
        changeDebug('Compiling...');
        submitCode();
    };

    const saveCodeToState = (code) => {
        setValue(code);
    };

    const onSelectionChange = async () => {
        // Store language selected into a variable
        const oldLang = currentLanguage;
        const selection = getLanguage();

        // Update current language in state to selection
        setCurrentLanguage(selection);
        console.log(currentLanguage);

        // Load new code after switch
    };

    const getLanguage = () => {
        let e = document.getElementById('language-selector');
        let language_num = e.options[e.selectedIndex].value;
        return language_num;
    };

    const questionCorrect = async () => {
        axios
            .post('/api/correct', {
                userId: user.id,
                questionId: props.questionId,
            })
            .then((res) => {})
            .catch((err) => console.log(err));
    };

    return (
        <div className="uk-grid" uk-grid>
            <div className="uk-width-1-2">
                <div className="question">
                    <h1 className="question-name">{questionName}</h1>
                    <p className="question-description">
                        {questionDescription}
                    </p>
                    <br />
                    <br />
                    <br />
                    <br />
                    <p className="question-description">{props.hint}</p>
                </div>
            </div>
            <div className="uk-width-1-2">
                <CodeMirror
                    editorDidMount={(editor) => {
                        //this.instance = editor;
                    }}
                    value={value}
                    options={options}
                    onBeforeChange={(editor, data, value) => {
                        setValue(value);
                    }}
                    onChange={(editor, data, value) => {
                        saveCodeToState(value);
                    }}
                />

                <textarea id="output-box" readOnly></textarea>
                <textarea id="debug-box" readOnly></textarea>
                <div className="bottomPart">
                    <div className="box-one">
                        <select
                            onChange={onSelectionChange}
                            id="language-selector"
                            className="custom-select select-menu"
                            data-live-search="true"
                        >
                            <option selected>Language</option>
                            <option value="1">Python</option>
                            <option value="2">Javascript</option>
                            <option value="5">Java</option>
                        </select>
                    </div>
                    <div className="box-two">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={runCode}
                        >
                            Run Code
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editor;
