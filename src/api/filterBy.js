const filterBy = {
  title: (match, textFilter) => match.title.toLowerCase().includes(textFilter.toLowerCase()),
  tournament: (match, textFilter) => (
    match.tournament.name.toLowerCase().includes(textFilter.toLowerCase()) ||
    match.tournament.shortName.toLowerCase().includes(textFilter.toLowerCase())
  ),
}

export default filterBy;