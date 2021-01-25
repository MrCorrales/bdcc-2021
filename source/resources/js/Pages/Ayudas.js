class Ayudas extends Default {


//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor() {
    super();

    const LINK_TO_CHECK = C.GetBy.selector("[data-checkbox-name]");
    C.ForEach(LINK_TO_CHECK, (item)=> {
      const IDS = item.getAttribute("data-checkbox-name").split(",");
      item.addEventListener(Basics.clickEvent,(e)=> {
        for(let i=0; i<IDS.length; i++) {
          const CHECK = C.GetBy.id(IDS[i]);
          CHECK.checked = true;
        }
      });
    });
  }
}