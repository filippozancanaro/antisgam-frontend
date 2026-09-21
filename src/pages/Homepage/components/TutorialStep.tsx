import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Props {
  number: string | number;
  text: string;
  imagePath: string;
  imageAlt: string;
  isSvg?: boolean;
  highlight?: boolean;
}

// Styled image per immagini comuni
const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '300px',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  marginBottom: theme.spacing(2),
}));

// Image specifica per SVG
const SvgImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '300px',
  marginBottom: theme.spacing(2),
}));

const TutorialStep = ({
  number,
  text,
  imagePath,
  imageAlt,
  isSvg = false,
  highlight = false,
}: Props) => {
  return (
    <Card>
      <CardHeader
        sx={{ paddingBottom: 0 }}
        title={
          <Typography variant="h6" sx={{ fontSize: 18 }}>
            {number}
          </Typography>
        }
      />
      <CardContent
        sx={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="body2"
          gutterBottom
          color={highlight ? 'primary' : 'text.primary'}
          sx={highlight ? { fontWeight: 'bold' } : undefined}
        >
          {text}
        </Typography>
        {isSvg ? (
          <SvgImage src={imagePath} alt={imageAlt} />
        ) : (
          <StyledImage src={imagePath} alt={imageAlt} />
        )}
      </CardContent>
    </Card>
  );
};

export default TutorialStep;
