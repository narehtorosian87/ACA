# Compare Rooms — feature spec

**Product:** Hotelchamp Booking Engine
**Step:** Rooms (2nd step of Calendar → Rooms → Rates → Checkout)
**Status:** Draft, prototyped

## Problem

On the Rooms step, guests see a grid of rooms — photos, name, description, starting price — but nothing that lets them weigh two or three options against each other. Comparing today means holding facilities and price in their head while scrolling, or opening rooms one at a time into the Rates step and losing their place. Either way, it's friction that can end in the guest abandoning rather than deciding.

## Objective

Let a guest compare rooms on the main attributes that actually drive a decision — price, capacity, size, view, cancellation policy, key facilities — **without leaving the Rooms step or interrupting the booking flow**.

## Why this shape (sticky tray → modal, not a new page)

- **The existing room card is untouched.** Photo, name, description, guest count, price — same layout, same order as today. The only new thing on the card is a "Compare" pill sitting on the photo itself, in the same visual family as the "Only one room left" badge. It doesn't add a row, a divider, or any element below the price, which is what made the first pass confusing: a checkbox living under a dashed line, at the bottom of a card of variable height, read as belonging to whichever room happened to start next in the grid. Anchoring it to the photo removes that ambiguity — it's unmistakably that room's control because it's drawn on that room's image.
- **Doesn't compete with the primary action.** The primary action on this step is picking a room and moving to Rates. A prominent "Compare" button next to every room would visually compete with that. The pill is quiet — it's opt-in, not a second call to action.
- **No navigation, no lost place.** Comparison opens as a panel over the current screen. Closing it (✕, Esc, or clicking outside) returns the guest to exactly where they were — same scroll position, same step. Nothing about picking a room to compare should feel like leaving Rooms.
- **The tray confirms the choice before committing to a panel.** As soon as one room is tagged, a sticky bar docks to the bottom with a thumbnail and price. It's a lightweight receipt ("you've tagged this"), not the comparison itself — that only opens once the guest deliberately asks for it, which keeps the noise low while browsing.
- **A cap of three.** Comparing is meant to resolve a decision between a short list, not become a spreadsheet. Three columns is the most a guest can meaningfully scan side by side on one screen without scrolling per-room; a fourth checkbox disables with a one-line reason instead of failing silently.
- **The comparison ends where the flow continues.** Each column in the comparison carries its own "View rates" action. Picking a winner from the comparison should drop the guest straight into that room's Rates step — the comparison is a detour off Rooms, not a dead end.

## Interaction flow

1. Guest browses the Rooms grid as today — nothing about the cards has changed.
2. Guest taps the "Compare" pill on a room's photo (top-right corner, next to the scarcity badge). It fills solid and reads "Comparing"; a tray docks to the bottom of the screen showing that room as a chip (thumbnail, name, price, a small ✕ to remove it).
3. Guest repeats for a second (and optionally third) room; each adds a chip to the tray. A "Clear all" link resets the whole selection; the ✕ on any chip removes just that one — the guest never has to scroll back up to undo a pick.
4. With exactly one room tagged, the tray shows a plain-language hint ("Select 1 more room to compare") next to a disabled "Compare rooms" button — the button's label never changes to an instruction, only its enabled state does.
5. At two or more, the button reads "Compare rooms (N)", carries a small icon, and is active.
6. Guest taps it → a comparison panel opens: one column per selected room, one row per attribute (photo, price, guests, size, bed, view, cancellation, facilities), each column ending in "View rates for this room."
7. Guest either closes the panel (back to browsing, selections preserved) or picks a room's CTA (proceeds into Rates for that room).

## Attributes compared

| Row | Notes |
|---|---|
| Photo + name | Visual anchor, same crop/ratio across columns |
| Price / night | Same tax/fee disclosure convention as the room cards |
| Guests | Max occupancy |
| Room size | m² |
| Bed configuration | |
| View | |
| Cancellation policy | Free-cancellation vs. non-refundable shown as a distinct label, not just prose |
| Key facilities | Short list, not the full amenity catalogue — this is a decision aid, not the room's full spec sheet |

## Edge cases handled in the prototype

- **Fewer than 2 selections:** tray's button stays disabled ("Select 2 rooms to compare") rather than opening a one-room comparison.
- **Limit reached:** unselected checkboxes disable with inline copy explaining the cap, instead of silently rejecting the click.
- **Mobile width:** comparison table scrolls horizontally inside its own container (attribute labels stay pinned); the page itself never scrolls sideways.
- **Reduced motion:** tray slide-in, modal, and toast transitions are skipped when the OS requests reduced motion.

## Not covered by this prototype (open questions for engineering/design handoff)

- Real room photography, carousels, and the actual ARI-driven price/availability feed — the prototype uses placeholder art and static mock data.
- Whether "View rates for this room" should also pre-select that room's rate list scroll position, or just land on Rates with the room pre-filtered.
- Persisting the compare selection if the guest navigates back from Rates to Rooms (recommended: yes, so re-comparing doesn't mean re-tagging).
- Any analytics/event tracking naming convention used elsewhere in the booking engine (e.g. an existing event taxonomy to slot "compare_room_added" / "compare_opened" / "compare_to_rates" into).
- Accessibility pass beyond the basics in the prototype (focus trap inside the modal, screen-reader labelling of the tray as a live region).

## Suggested success metric

Share of sessions that use Compare **and go on to reach Checkout**, versus sessions of similar length that don't use it — the feature should raise decision confidence, not just add a toy to play with mid-funnel.
