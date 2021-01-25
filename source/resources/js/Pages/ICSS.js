class ICSS extends Default {

  _dom = C.GetBy.class("section-tool-detail", this.container);

  constructor() {
    super();

    const T1 = C.GetBy.class("__text1", this.container)[0];
    const T2 = C.GetBy.class("__text2", this.container)[0];
    const BTNS = C.GetBy.class("__selection", this.container);
    const VALUES = C.GetBy.class("__values", this.container)[0];
    const SELECTOR = C.GetBy.class("__selector", this.container)[0];

    let actualBTN = BTNS[0];

    C.ForEach(BTNS, (item)=> {
      item.addEventListener(Basics.clickEvent, (e)=> {
        e.preventDefault();

        if(actualBTN) {
          actualBTN.classList.remove("--selected");
          VALUES.classList.remove(actualBTN.getAttribute("data-value"));
        }
        actualBTN = item;
        actualBTN.classList.add("--selected");

        const TEXT = item.textContent;
        T1.textContent = TEXT;
        T2.textContent = TEXT;
        VALUES.classList.add(actualBTN.getAttribute("data-value"));

        /*SELECTOR.classList.add("--disabled");
        setTimeout(()=> {
          SELECTOR.classList.remove("--disabled");
        },1000)*/


      });
    })
  }

  dispose() {
    super.dispose();
  }
}