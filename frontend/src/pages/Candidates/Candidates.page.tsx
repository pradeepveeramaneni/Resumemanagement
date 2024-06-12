import './candidates.scss';
import httpModule from '../../components/helpers/http.module';
import { useEffect, useState } from 'react';
import { ICandidate } from '../../types/global.typing';
import { Button, CircularProgress } from '@mui/material';
import { redirect, useNavigate } from 'react-router-dom';
import {Add} from "@mui/icons-material"
 import CandidatesGrid from '../../components/candidates/CandidatesGrid.component';


const Candidates = () => {
    const [candidates, setCandidates] = useState<ICandidate[]>([])
    const [loading,setLoading] = useState<boolean>(false);
    const redirect=useNavigate();

    useEffect(()=>{
        setLoading(true);
        httpModule.get<ICandidate[]>("/Candidate/Get")
        .then(response=>{
            setCandidates(response.data);
            setLoading(false);
        })
        .catch(
            error=>{
            alert("error")
            console.log(error)
            setLoading(false);
            });
        
    } ,[]);

    console.log(candidates);
  return (
    <div className="content candidates">
        <div className="heading">
        <h2>Candidates</h2>
        <Button variant='outlined' onClick={()=>redirect("/candidates/add")}>
            <Add/>
        </Button>    
    </div>
    {
        loading ? <CircularProgress size = {100} /> : candidates.length===0?<h1>no candidates yet</h1>:<CandidatesGrid data={candidates} />
    }

    </div>  
  );
};

export default Candidates;