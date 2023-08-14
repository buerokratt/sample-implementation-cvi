# About

This is a repo to showcase how to implement different CVI components when building Bürokratt.

# References

### Gov CVI

https://github.com/orgs/buerokratt/projects/34
https://github.com/buerokratt/cvi

# Sample solution

### Short description

This is sample solution developers can take as base for the new applications.
The solution has common base layout created and example main navigation added.
Also two very simple example pages are included.

### Components from CVI

The solution uses styles (https://github.com/buerokratt/cvi/tree/main/libs/styles/src/lib)
and components (https://github.com/buerokratt/cvi/tree/main/libs/react-ui/src/lib) from CVI.
From components are used icons and main-navigation. All styles are directly copied to solution.

### Next steps

As main-navigation menu items parameter is currently hardcoded, probably some (network) services must be created.
The layout component needs to be updated to use the services.
(Read the comments in layout and main-navigation components code)
Router routes (in correlation with main-navigation items) must be defined/updated to load correct pages.
