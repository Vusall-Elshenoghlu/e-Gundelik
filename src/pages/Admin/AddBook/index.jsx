import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const AddBook = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const initialValues = {
    name: '',
    subjectId: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Book name is required'),
    subjectId: Yup.string()
      .uuid('Invalid Subject ID format')
      .required('Subject ID is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    if (!selectedFile) {
      alert("Please select a PDF file!");
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("subjectId", values.subjectId);
    formData.append("pdf", selectedFile); // Important: match backend param

    try {
      const response = await axios.post(
        'https://turansalimli-001-site1.ntempurl.com/api/Book/CreateBook',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            accept: '*/*',
          },
        }
      );
      alert("Book successfully created!");
      resetForm();
      setSelectedFile(null);
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
        {({ setFieldValue }) => (
          <Form className="mt-4">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Book Name</label>
              <Field name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="subjectId" className="form-label">Subject ID</label>
              <Field name="subjectId" className="form-control" />
              <ErrorMessage name="subjectId" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="pdf" className="form-label">Upload PDF</label>
              <input
                type="file"
                className="form-control"
                accept="application/pdf"
                onChange={(event) => {
                  setSelectedFile(event.currentTarget.files[0]);
                }}
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
