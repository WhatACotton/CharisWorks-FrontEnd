import * as React from "react";
import {
  Grid,
  Paper,
  Typography,
  Autocomplete,
  TextField,
  Button,
  SearchIcon,
  Link,
  Stack,
} from "../lib/mui";
interface SidebarProps {
  archives: ReadonlyArray<{
    url: string;
    title: string;
  }>;
  description: string;
  social: ReadonlyArray<{
    icon: React.ElementType;
    name: string;
  }>;
  title: string;
}

const Sidebar = (props: SidebarProps) => {
  const { archives, description, social, title } = props;
  const options = [
    { label: "ピンク", id: 1 },
    { label: "青", id: 2 },
    { label: "16cm", id: 3 },
    { label: "17cm", id: 4 },
    { label: "xxシリーズ", id: 5 },
  ];
  return (
    <Grid item xs={12} pl={1}>
      <Paper elevation={4} sx={{ p: 2, bgcolor: "grey.200" }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      {/* <Grid container item>
        <Typography variant="h6" gutterBottom sx={{ mt: 3, ml: 0 }}>
          商品を探す
        </Typography>
        <Grid container item justifyContent="flex-end">
          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              multiple
              id="combo-box-demo"
              options={options}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="サイズ・色などから検索できます" />
              )}
            />
          </Grid>
          <Grid>
            <Button variant="contained" sx={{ mt: 1 }}>
              <SearchIcon />
              検索
            </Button>
          </Grid>
        </Grid>
      </Grid> */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        お知らせ
      </Typography>
      {archives.map((archive) => (
        <Link
          display="block"
          variant="body1"
          href={archive.url}
          key={archive.title}
        >
          {archive.title}
        </Link>
      ))}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Social
      </Typography>
      {social.map((network) => (
        <Link
          display="block"
          variant="body1"
          href="#"
          key={network.name}
          sx={{ mb: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <network.icon />
            <span>{network.name}</span>
          </Stack>
        </Link>
      ))}
    </Grid>
  );
};
export default Sidebar;
