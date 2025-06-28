import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAxiosWithAuth } from '../../../hooks/UseAxiosWithAuth';

const AddBook = () => {
  const [subjects, setSubjects] = useState([]);
  const axiosAuth = useAxiosWithAuth()
  const initialValues = {
    name: '',
    subjectId: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Book name is required'),
    subjectId: Yup.string().required('Subject ID is required'),
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get('https://turansalimli-001-site1.ntempurl.com/api/Subject/GetAllSubject');
        setSubjects(res.data || []);
      } catch (error) {
        console.error("Fənnlər yüklənərkən xəta:", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput?.files[0];

    if (!file) {
      alert("Please select a PDF file!");
      return;
    }

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('subjectId', values.subjectId);
    formData.append('pdf', file);

    try {
      const response = await axiosAuth.post(
        'https://turansalimli-001-site1.ntempurl.com/api/Book/CreateBook',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert("Book successfully created!");
      resetForm();
    } catch (error) {
      console.error('Error uploading book:', error);
      alert('Failed to upload book.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Book</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="mt-4">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Book Name</label>
              <Field name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="subjectId" className="form-label">Fənn seçin</label>
              <Field as="select" name="subjectId" className="form-select">
                <option value="">Fənn seçin...</option>
                {subjects.map(subject => (
                  <option key={subject.id || subject._id} value={subject.id || subject._id}>
                    {subject.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="subjectId" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="pdf" className="form-label">Upload PDF</label>
              <input
                type="file"
                className="form-control"
                accept="application/pdf"
              />
            </div>

            <button type="submit" className="btn btn-primary">Add Book</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBook;
