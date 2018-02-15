**FREE

//=======================================================================
//                                                                      *
//  View Products                                                       *
//                                                                      *
//=======================================================================

Ctl-Opt DFTACTGRP(*NO);

//=============================

Dcl-F INQ05D WORKSTN
             SFile(PRODSFL : RRN1)
             SFile(FEATSFL : RRN2)
             SFile(COMPARESFL : RRN3)
             HANDLER('PROFOUNDUI(HANDLER)');

//=============================

Dcl-F PRODUCTSP  Usage(*Input) Keyed;
Dcl-F PRODUCTS1L Usage(*Input) Keyed Rename(PRODUCTS : PRODUCTS1);
Dcl-F PRODUCTS2L Usage(*Input) Keyed Rename(PRODUCTS : PRODUCTS2);

Dcl-F PRODFEATP Usage(*Input) Keyed;
Dcl-F FEATURESP Usage(*Input) Keyed;
Dcl-F CATEGP    Usage(*Input) Keyed;

//=============================

Dcl-S RRN1 Int(10);
Dcl-S RRN2 Int(10);
Dcl-S RRN3 Int(10);

Dcl-S Product1 Like(PRID);
Dcl-S Product2 Like(PRID);

Dcl-S BlankImage Like(Image1);

//=============================

Dcl-Pr PRODDSP ExtPgm('PRODDSP');
  *N Packed(5); //Product ID
End-Pr;

//=============================

BlankImage = '/profoundui/userdata/images/empty.png';
Image1 = BlankImage;
Image2 = BlankImage;

// Retrive product category - first category is the default
SetLL *LoVal CATEG;
Read CATEG;
S1CATID = CATID;

// Keep running until F3=Exit is used
Dow Not *In03;

  // Load products subfile
  ExSr LoadProdSFL;
  ExSr LoadCompare;

  // Show main product subfile screen
  Write PRODBOTTOM;
  ExFmt PRODCTL;

  // Test for drag and drop operation
  If DDRRN > 0;
    Chain DDRRN PRODSFL;
    If %Found();
      If DDElem = 'Image1';
        Product1 = PRID;
        ProdName1 = PRNAME;
        Image1 = PRIMAGE;
        Price1 = PRPRICE;
      EndIf;
      If DDElem = 'Image2';
        Product2 = PRID;
        ProdName2 = PRNAME;
        Image2 = PRIMAGE;
        Price2 = PRPRICE;
      EndIf;
    EndIf;
    DDRRN = 0;
  EndIf;

  // Test if a subfile record was selected by user
  ReadC PRODSFL;

  If Not %Eof() and OPT = '1';
    //ExSr ShowProdDetails;
    PRODDSP(PRID);
  EndIf;

EndDo;

// End Program
*InLr = *On;


//*=======================================================================
//*  Load Products Subfile                                               *
//*=======================================================================

BegSr LoadProdSFL;

  // Clear Subfile
  RRN1 = 0;
  *In70 = *On;  // Clear Subfile Indicator
  WRITE PRODCTL;
  *In70 = *Off;

  // Read first record
  If S1PRNAME = '';
    SetLL (S1CATID : S1PRID) PRODUCTS1;
    ReadE S1CATID PRODUCTS1;
  Else;
    SetLL (S1CATID : S1PRNAME) PRODUCTS2;
    ReadE S1CATID PRODUCTS2;
  EndIf;

  Dow Not %Eof();
    // Write to subfile
    RRN1 += 1;
    OPT = '';
    WRITE PRODSFL;

    // Read next record
    If S1PRNAME = '';
      ReadE S1CATID PRODUCTS1;
    Else;
      ReadE S1CATID PRODUCTS2;
    EndIf;
  EndDo;

EndSr;


//*=======================================================================
//*  Show Product Details                                                *
//*=======================================================================

BegSr ShowProdDetails;

  // Get product record
  Chain PRID PRODUCTS;

  // Retrieve category description
  CATNAME = '';
  Chain PRCATID CATEG;

  Dou Not *In06;
    ExFmt PRODDETL;
    If *In06;  // F6=Show Features
      ExSr ShowFeatures;
    EndIf;
  EndDo;

EndSr;


//*=======================================================================
//*  Show Features                                                       *
//*=======================================================================

BegSr ShowFeatures;

  // Clear Features Subfile
  RRN2 = 0;
  *In60 = *On;  // Clear Subfile Indicator
  WRITE FEATWIN;
  *In60 = *Off;

  // Load Features Subfile
  SetLL PRID PRODFEAT;
  ReadE PRID PRODFEAT;
  Dow Not %EOF();
    Chain XFEID FEATURES;
    If Not %Found();
      FENAME = '';
    EndIf;
    RRN2 += 1;
    Write FEATSFL;
    ReadE PRID PRODFEAT;
  EndDo;

  // Show Features Window
  ExFmt FEATWIN;

EndSr;


//*=======================================================================
//*  Load Comparison Grid                                                *
//*=======================================================================

BegSr LoadCompare;

  // Clear grid first
  RRN3 = 0;
  ClearSFL = *On;
  WRITE PRODCTL;
  ClearSFL = *Off;

  // Load Features
  SetLL *LoVal FEATURES;
  Read FEATURES;
  Dow Not %EOF();
    Chain (Product1 : FEID) PRODFEAT;
    Check1 = %Found();
    Chain (Product2 : FEID) PRODFEAT;
    Check2 = %Found();
    RRN3 += 1;
    Write COMPARESFL;
    Read FEATURES;
  EndDo;

EndSr;
