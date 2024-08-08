import axios from "axios";
import { useEffect, useState } from "react";

function AddFile() {

    const [classes, setClasses] = useState([]);
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
      const fetchClasses = async () => {
        try {
          const response = await axios.get('http://localhost:8080/class');
          setClasses(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching classes:', error);
        }
      };
      fetchClasses();
    }, []);


    const handleFileUpload = async (classItem) => {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('classId', classItem._id);
        const response = await axios.post('http://localhost:8080/file/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `${token}`,
          },    
        });
        setMessage(response.data.message);
        console.log(response.status)
        if(response.status === 201){
            setMessage("File uploaded successfully")
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

  return (
    <div className='classes'>
      <h1>Available Classes</h1>
      {message && <p>{message}</p>}
      <ul>
        {classes.map((classItem) => (
          <li key={classItem._id}>
            <h2 >{classItem.name}</h2>
            <p>{classItem.description}</p>
            <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
            <button onClick={() => handleFileUpload(classItem)}>Upload</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default AddFile