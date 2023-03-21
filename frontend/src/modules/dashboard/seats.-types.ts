export interface ISeat {
  iddoc: number;
  descasiento: string;
  refdoc: string;
  anocont: number;
  percont: number;
  fecasiento: string;
  dsp_MtoDoc: string;
  numpublicacion: number;
  stsasiento: string;
  raw_rnum_: number;
  idasiento?: any;
}

export interface IMonedaSelect {
  codmoneda: string,
  nommoneda: string
}

export interface ISeatDetails {
  cabasiento:   ISeatHeader;
  cabdocumento: ISeatDocument;
  detasiento:   ISeatMoviment[];
}

export interface ISeatHeader {
  idasiento:      number;
  numpublicacion: number;
  anocont:        number;
  percont:        number;
  fecasiento:     Date | string;
  descasiento:    string;
  stsasiento:     string;
  orgasiento:     string;
  numasiento:     number;
  tipoasiento:    number;
  usuing:         string;
  indautomatico:  string;
  fecing:         Date;
  usucont:        null;
  feccont:        null;
  usureg:         string;
  fecreg:         null;
  totdbcomp:      string;
  totcrcomp:      string;
  iddoc:          number;
  codevento:      null;
  idevento:       number;
  mensajes:       null;
  tipoevento:     string;
  observ:         null;
  codmoneda:      string;
  dsp_IndSisReg:  string;
}

export enum SeatReversoEnum {
  true = 'S',
  false = 'N'
}

export interface ISeatDocument {
  iddoc:           number;
  descdoc:         string;
  origen:          string;
  numbenef:        number;
  refdoc:          string;
  mtodoc:          string;
  stsdoc:          string;
  fecdoc:          Date;
  tipodoc:         string;
  ano:             number;
  usrsts:          string;
  fecsts:          Date;
  indreverso:      SeatReversoEnum;
  mensaje:         null;
  numcomprom:      null;
  iddocref:        null | string; 
  ccosto:          null;
  codproyint:      null;
  usrcre:          null;
  usrcod:          null;
  usrrec:          string;
  usrver:          null;
  iddocfis:        null;
  fecvencdoc:      null;
  sistfecvencdoc:  null;
  fecref:          Date;
  codsisreg:       null;
  numop:           null;
  idpagoorigen:    null;
  iddocorigtransf: null;
  iddoctransf:     null;
  descdocext:      null;
  codsitio:        string;
  codmoneda:       string;
  tasa:            string;
  montoorig:       string;
  mtodocant:       null;
  codmonedaant:    null;
  codmonedamtodoc: string;
  codundorig:      string;
  codundadmorig:   string;
  codundadmpro:    string;
  numbenefaux:     null;
  idprocexonera:   null;
  porcentaje:      null;
  mtobaseded:      null;
  iddocexterno:    null;
  rifbenef:        string;
  dsp_nombrebenef: string;
  dsp_desctipodoc: string;
}

export interface ISeatMoviment {
  idasiento:        number;
  nummov:           number;
  anocont:          number;
  percont:          number;
  codcuenta:        string;
  numpublicacion:   number;
  tipoauxiliar:     string;
  codauxiliar:      string;
  montodb:          string;
  montocr:          string;
  codmoneda:        string;
  descmov:          string;
  dsp_DesCtaPub:    string;
  dsp_DescAuxiliar: null;
  dsp_CuentaPadre:  string;
}

export interface ISeatParamsUpdate {
  idasiento: number;
  nunmov: string;
  data_asiento: IUpdateSeatHeaderInput;
  data_documento: IUpdateSeatDocumentInput;
  data_movimiento: IUpdateSeatMovimientoInput[];
}

export interface IUpdateSeatHeaderInput {
  descasiento: string;
  fecasiento: Date | string;
}

export interface IUpdateSeatMovimientoInput {
  anocont: number; 
  percont: number; 
  numpublicacion: number;
  codcuenta: string;
  tipoauxiliar: string;
  codauxiliar:string; 
  montodb: string, 
  montocr: string, 
  codmoneda: string;
  descmov: string;
}

export interface IUpdateSeatDocumentInput {
  tipodoc: string;
  numbenef: number,
  codsitio: string,
  codmoneda : string;
  dsp_nombrebenef: string;
  iddocref: string | null;
  indreverso: SeatReversoEnum;
  montoorig: string;
  codmonedamtodoc: string;
  refdoc: string;
  mtodoc: string;
}

export interface IUpdateSeatInput {
  cabasiento: IUpdateSeatHeaderInput;
  cabdocumento: IUpdateSeatDocumentInput;
}