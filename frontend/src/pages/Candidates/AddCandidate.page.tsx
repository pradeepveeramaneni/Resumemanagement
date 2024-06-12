import { useEffect, useState } from "react";
import { IJob, ICreateCandidateDto } from "../../types/global.typing";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import httpModule from "../../components/helpers/http.module";
import "./candidates.scss";
import Candidates from "./Candidates.page";

const AddJob = () => {
  const [candidate, setCandidate] = useState<ICreateCandidateDto>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
    jodId: "",
  });

  const redirect = useNavigate();
  const [jobs, setJobs] = useState<IJob[]>([]);

  useEffect(() => {
    httpModule
      .get<IJob[]>("/Job/Get")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        alert("error");
        console.log(error);
      });
  }, []);

  const [pdfFile, setPdfFile] = useState<File | null>();

  // const handleClickSaveBtn = () => {
  //   if (
  //     candidate.firstName === "" ||
  //     candidate.lastName === "" ||
  //     candidate.email === "" ||
  //     candidate.coverLetter === "" ||
  //     candidate.phone === "" ||
  //     candidate.jodId === "" ||
  //     !pdfFile
  //   ) {
  //     alert("Fill all fields");
  //     return;
  //   }

  

  //   const newCandidateFormData = new FormData();
  //   newCandidateFormData.append("pdfFile", pdfFile);
  //   newCandidateFormData.append("firstName", candidate.firstName);
  //   newCandidateFormData.append("lastName", candidate.lastName);
  //   newCandidateFormData.append("email", candidate.email);
  //   newCandidateFormData.append("phone", candidate.phone);
  //   newCandidateFormData.append("coverLetter", candidate.coverLetter);
  //   newCandidateFormData.append("jobId", candidate.jodId);
    
  //   httpModule
  //     .post("/Candidate/create", newCandidateFormData)
  //     .then((response) => redirect("/candidates"))
  //     .catch((error) => console.log(error));
  // };


  const handleClickSaveBtn = () => {
    if (
      !candidate.firstName ||
      !candidate.lastName ||
      !candidate.email ||
      !candidate.coverLetter ||
      !candidate.phone ||
      !candidate.jodId ||
      !pdfFile
    ) {
      alert("Fill all fields");
      return;
    }
  
    const newCandidateFormData = new FormData();
  
    // Loop through candidate properties and append them to FormData
    for (const [key, value] of Object.entries(candidate)) {
      newCandidateFormData.append(key, value);
    }
  
    // Append the pdfFile to FormData
    newCandidateFormData.append("pdfFile", pdfFile);
  
    httpModule
      .post("/Candidate/create", newCandidateFormData)
      .then((response) => redirect("/candidates"))
      .catch((error) => console.log(error));
  };
  

  const handleclickBackBtn = () => {
    redirect("/candidates");
  };

  return (
    <div className="content">
      <div className="add-candidate">
        <h2>Add New Candidate</h2>
        <FormControl fullWidth>
          <InputLabel>Job</InputLabel>
          <Select
            value={candidate.jodId}
            label="Job"
            onChange={(e) =>
              setCandidate({ ...candidate, jodId: e.target.value })
            }
          >
            {jobs.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          autoComplete="off"
          label="First Name"
          variant="outlined"
          value={candidate.firstName}
          onChange={(e) =>
            setCandidate({ ...candidate, firstName: e.target.value })
          }
        />

        <TextField
          autoComplete="off"
          label="Last Name"
          variant="outlined"
          value={candidate.lastName}
          onChange={(e) =>
            setCandidate({ ...candidate, lastName: e.target.value })
          }
        />

        <TextField
          autoComplete="off"
          label="Email ID"
          variant="outlined"
          value={candidate.email}
          onChange={(e) =>
            setCandidate({ ...candidate, email: e.target.value })
          }
        />

        <TextField
          autoComplete="off"
          label="Phone no."
          variant="outlined"
          value={candidate.phone}
          onChange={(e) =>
            setCandidate({ ...candidate, phone: e.target.value })
          }
        />

        <TextField
          autoComplete="off"
          label="C V"
          variant="outlined"
          value={candidate.coverLetter}
          onChange={(e) =>
            setCandidate({ ...candidate, coverLetter: e.target.value })
          }
          multiline
        />

        <input
          type="file"
          onChange={(e) =>
            setPdfFile(e.target.files ? e.target.files[0] : null)
          }
        />
      

        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleclickBackBtn}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AddJob;
