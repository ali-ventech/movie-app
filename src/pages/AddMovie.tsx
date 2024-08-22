import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addMovie } from "../redux/slices/movieSlice";
import { InsertPhoto } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: string;
  title: string;
  year: number;
  description: string;
  rating: number;
  cast: { name: string }[];
  runtime: string;
  medium_cover_image: string;
  large_cover_image: string;
  small_cover_image: string;
}

interface MovieFormInput {
  title: string;
  year: number;
  description: string;
  rating: number;
  cast: string;
  runtime: string;
  medium_cover_image: string;
}

const schema = Joi.object({
  title: Joi.string().required().label("Title"),
  year: Joi.number()
    .integer()
    .max(new Date().getFullYear())
    .required()
    .label("Year"),
  description: Joi.string().required().label("Description"),
  rating: Joi.number().min(1).max(10).required().label("Rating"),
  cast: Joi.string().required().label("Cast"),
  runtime: Joi.string().required().label("Runtime"),
  medium_cover_image: Joi.string().required().label("Image URL"),
});

const MovieForm: React.FC = () => {
  const [preview, setPreview] = useState<string | undefined>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState("");
  const navigate = useNavigate();

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const FILE_SIZE = 2 * 1024 * 1024;

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const convertToBase64 = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result as string;
      callback(base64String);
      setPreview(base64String);
    };
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!SUPPORTED_FORMATS.includes(file.type)) {
        setImageError("Unsupported file format");
        field.onChange("");
      } else if (file.size > FILE_SIZE) {
        setImageError("File size is too large");
        field.onChange("");
      } else {
        setImageError("");
        convertToBase64(file, field.onChange);
      }
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MovieFormInput>({
    resolver: joiResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = async (data: MovieFormInput) => {
    try {
      const castArray = data.cast
        .split(",")
        .map((name) => ({ name: name.trim() }));
      const newMovie: Movie = {
        ...data,
        large_cover_image: data.medium_cover_image,
        small_cover_image: data.medium_cover_image,
        cast: castArray,
        id: uuidv4(),
      };
      dispatch(addMovie(newMovie));
      toast.success("Movie Added Successfully");
      navigate("/");
    } catch (error) {
      console.error("Error adding movie:", error);
      toast.error("An error occurred while adding the movie.");
    }
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />

        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Year"
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.year}
              helperText={errors.year?.message}
              type="number"
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />

        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Rating"
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.rating}
              helperText={errors.rating?.message}
              type="number"
              inputProps={{ min: 0, max: 10, step: 0.1 }}
            />
          )}
        />

        <Controller
          name="cast"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Cast (comma separated)"
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.cast}
              helperText={errors.cast?.message}
            />
          )}
        />

        <Controller
          name="runtime"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Runtime"
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.runtime}
              helperText={errors.runtime?.message}
            />
          )}
        />

        <Controller
          name="medium_cover_image"
          control={control}
          render={({ field }) => (
            <Box
              component="div"
              sx={(theme) => ({
                height: "100%",
                width: 140,
                cursor: "pointer",
                position: "relative",
                borderRadius: 2,
                scrollbarGutter: "stable",
                [theme.breakpoints.down("md")]: {
                  flexBasis: 6,
                },
              })}
              onClick={handleDivClick}
            >
              {preview ? (
                <Box
                  component="img"
                  src={preview}
                  alt="Uploaded Preview"
                  sx={{
                    width: 120,
                    borderRadius: 2,
                  }}
                />
              ) : (
                <>
                  <InsertPhoto sx={{ fontSize: 130, opacity: "50%" }} />
                  <Typography fontSize="small">
                    Click to insert an image
                  </Typography>
                  {imageError && (
                    <Typography
                      sx={{
                        color: "red",
                      }}
                    >
                      {imageError}
                    </Typography>
                  )}
                </>
              )}
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={(e) => handleImageChange(e, field)}
                accept="image/jpeg, image/png, image/jpg"
              />
            </Box>
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          sx={{ width: 16 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default MovieForm;
