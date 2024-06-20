export const navigation = [
    {
        label: "TV Shows",
        href : 'tv',
        icon : 'PiTelevisionFill'
    },
    {
        label: "Movies",
        href : "movie",
        icon : 'BiSolidMoviePlay'
    }
];

export const mobileNavigation = [
    {
        label : "Home",
        href : "/",
        icon : 'MdHomeFilled'
    },
    ...navigation,
    {
        label: "Search",
        href: "search",
        icon: 'IoSearchOutline'
    }
];