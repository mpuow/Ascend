import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";

const styles = {
    global: (props: StyleFunctionProps) => ({
        body: {
            // Sets a custom bg color for dark mode
            bg: mode(
                // Light mode value from theme
                props.theme.semanticTokens.colors['chakra-body-bg']._light,
                // Value for dark mode
                'black',
            )(props),
        },
    }),
};

const components = {
    Drawer: {
        // Setup light/dark mode component defaults
        baseStyle: (props: any) => ({
            dialog: {
                bg: mode('#edf2f7', '#141214')(props),
            },
        }),
    },
};

// Colours used extensively throughout the app set up in theme
const theme = extendTheme({
    components,
    styles,
    initialColorMode: 'dark',
    colors: {
        bgDark: {
            900: "#141214"
        },
        bgLight: {
            100: "#edf2f7"
        },
        textDark: {
            900: "#edeced"
        },
        textLight: {
            100: "gray.800"
        }
    },
    shadows: {
        mainShadow: "0 0 8px 3px rgba(0,0,0,0.2)"
    }
});

export default theme;