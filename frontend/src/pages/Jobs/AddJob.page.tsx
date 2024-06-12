import { useEffect, useState } from "react";
import { ICompany, ICreateJobDto } from "../../types/global.typing";
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
import "./jobs.scss";

const AddJob = () => {
  const [job, setJob] = useState<ICreateJobDto>({
    title: "",
    level: "",
    companyId: "",
  });

  const redirect = useNavigate();
  const [companies, setCompanies] = useState<ICompany[]>([]);

  useEffect(() => {
    httpModule
      .get<ICompany[]>("/Company/Get")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        alert("error");
        console.log(error);
      });
  }, []);

  const handleClickSaveBtn = () => {
    if (job.title === "" || job.level === ""||job.companyId === "") {
      alert("Fill all fields");
      return;
    }
    httpModule
      .post("/job/create", job)
      .then((response) => redirect("/jobs"))
      .catch((error) => console.log(error));
  };

  const handleclickBackBtn = () => {
    redirect("/jobs");
  };

  const levelsArray: string[] = [
    "Intern",
    "Junior",
    "MidLevel",
    "Senior",
    "TeamLead",
    "Cto",
    "Architect",
  ];

  return (
    <div className="content">
      <div className="add-job">
        <h2>Add new job</h2>
        <TextField
          autoComplete="off"
          label="Job Title"
          variant="outlined"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />

        <FormControl fullWidth>
          <InputLabel>Job Level</InputLabel>
          <Select
            value={job.level}
            label="job level"
            onChange={(e) => setJob({ ...job, level: e.target.value })}
          >
            {levelsArray.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}

            {/* <MenuItem value="Intern">Intern</MenuItem>
            <MenuItem value="Junior">Junior</MenuItem>
            <MenuItem value="MidLevel">MidLevel</MenuItem>
            <MenuItem value="Senior">Senior</MenuItem>
            <MenuItem value="Cto">Cto</MenuItem>
            <MenuItem value="Architect">Architect</MenuItem> */}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Company</InputLabel>
          <Select
            value={job.companyId}
            label="Company"
            onChange={(e) => setJob({ ...job, companyId: e.target.value })}
          >
            {companies.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}

           
          </Select>
        </FormControl>

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
