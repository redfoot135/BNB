import './Diary.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AWS from "aws-sdk";
import { v4 } from 'uuid';
import Title from '../components/Title';
import Nav from '../components/Nav';
import DiaryPage from '../components/DiaryPage';
import LoginReqModal from '../components/LoginReqModal';
const { REACT_APP_SERVER, REACT_APP_ACCESSKEY, REACT_APP_SECRETKEY, REACT_APP_BUCKET } = process.env;

function Diary({ userinfo, setLoading }) {


  return (
    <>

    </>
  )
}

export default Diary;