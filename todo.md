- [x] status header

  - [x] round #
  - [x] vp count
  - [x] droplet
  - [x] rubies
  - [x] bag size

- round flow:

  - [ ] state: fortune (low pri)
    - [ ] todo: list fortunes here
  - [x] state: cauldron drawing
    - droplet
      - [x] show droplet on board
      - [ ] advance it the necessary # of spaces at round start
    - draw ingredient...
      - [x] white
      - [x] orange
      - [x] blue -> draw (value) chips and choose to place 1
      - red
        - [ ] if there are 1 or 2 orange chips, +1
        - [ ] if there are 3+ orange chips, +2
      - [x] yellow: if last chip was white, return it to the bag
      - [x] green (resolve at end)
      - [ ] purple (resolve at end)
      - [ ] black (resolve at end)
      - [ ] locoweed (lopri): return any chip but white to the bag
    - [ ] stop button -> go to brewing results
    - [x] keep track of cherry bomb count
    - [ ] when 8 or more -> go to brewing results
  - state: brewing results
    - [ ] exploded?
    - resolve black
      - [ ] 1 -> +1 droplet
      - [ ] 2+ -> +1 droplet +1 ruby
    - resolve green
      - [ ] greens in last or second to last: receive +1 ruby
    - resolve pink
      - [ ] 1 -> +1 vp
      - [ ] 2 -> +1 vp +1 ruby
      - [ ] 3+ -> +2 vp +1 droplet
    - [ ] gain vp
    - [ ] gain rubies
    - [ ] shop points
    - [ ] continue to shop
  - [ ] state: shop
    - [ ] shop points
    - [ ] list all chips and their effects
    - [ ] allow choosing up to two unique chips
    - [ ] when 1 or 2 chips are chosen, show continue button to next round

- [ ] game ends after 9 rounds

- [ ] animations uwu

- [ ] info button somewhere to show droplet colors & effects

- [ ] move "add ingredient" button to the actual board, instead of a separate disconnected button
