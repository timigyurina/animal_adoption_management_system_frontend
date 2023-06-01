import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const ImageCard = ({ image, imageTitle }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        image={`${process.env.REACT_APP_BACKEND_URL}/${image.imagePath}`}
        alt={image.description}
      />
      <CardContent>
        {imageTitle && (
          <Typography gutterBottom variant="h6" component="h6">
            {imageTitle}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {image.description}
        </Typography>
        <Typography variant="overline">
          {image.dateTaken.substring(0, 10)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
