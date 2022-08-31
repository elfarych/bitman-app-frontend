export function mutationEvents (state, data) {
  const upcomingEvents = data.filter(item => {
    const eventTime = new Date(item.event_date)
    const now = new Date()
    return eventTime.getTime() >= now.getTime()
  })
  state.upcomingEvents = upcomingEvents.sort((a, b) => new Date(a.event_date).getTime() > new Date(b.event_date).getTime() ? 1 : -1)

  const endedEvents = data.filter(item => {
    const eventTime = new Date(item.event_date)
    const now = new Date()
    return eventTime.getTime() < now.getTime()
  })
  state.endedEvents = endedEvents
}

export function mutationCategories (state, data) {
  state.categories = data
}
