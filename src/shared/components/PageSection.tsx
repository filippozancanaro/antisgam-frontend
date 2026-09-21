import { Grid, type GridProps } from "@mui/material";

/**
 * Colonna centrale delle pagine: piena larghezza fino a `md`,
 * con margini laterali crescenti su schermi grandi.
 */
const PageSection = ({ children, ...props }: GridProps) => (
  <Grid size={{ xs: 12, lg: 10, xl: 8 }} offset={{ lg: 1, xl: 2 }} {...props}>
    {children}
  </Grid>
);

export default PageSection;
