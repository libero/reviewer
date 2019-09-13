# `event-bus`

> This will provide common types and implementation for connecting to our glorious message bus

## Integration with Pubsweet
During the August 2019 PubSweet Meet, we discussed how to share types and interfaces across projects, and
how that would then enable us to share components with other systems built on top of event buses.

This package (currently) contains both these types and a couple of implementations of the interfaces, the plan is to move the definition of the interface (i.e. the contents `src/event-bus`) to within PubSweet so other projects can reuse existing implementations of the event-bus.

There's more detail about this here:
- [PubSweet MR](https://gitlab.coko.foundation/pubsweet/pubsweet/merge_requests/593#note_40573)
- [PubSweet 'epic' ticket](https://gitlab.coko.foundation/pubsweet/pubsweet/issues/461)
- [Repo Link](http://example.com) (TODO: we need to make a new repo)
