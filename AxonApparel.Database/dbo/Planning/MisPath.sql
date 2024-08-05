﻿CREATE TABLE [dbo].[MisPath]
(
    [MispathId] [int] IDENTITY(1,1) NOT NULL,
    [path] [varchar](50) NULL,
	[docupath] [varchar](200) NULL,
	[dCompanyUnitId] [int] NULL,
	[dCompanyId] [int] NULL,
	[dCurrencyId] [int] NULL,
	[reportpath] [varchar](100) NULL,
	[FilterRefNo] [varchar](1) NOT NULL DEFAULT ('N'),
	[Inrid] [int] NULL,
	[F7Option] [varchar](1) NULL,
	[SupressZeroInNumGen] [varchar](1) NULL,
	[CostAppCheck] [varchar](1) NULL,
	[plan_fabric_sum_unit] [bit] NULL,
	[Popserver] [varchar](100) NULL,
	[Fromid] [varchar](100) NULL,
	[AllowGenStk] [char](1) NULL,
	[CostProCheckWork] [char](1) NULL,
	[AllowOrdQtyInvoice] [char](1) NULL,
	[DisAccPackAttachinPO] [char](1) NULL,
	[StockAuditExcessPer] [numeric](5, 2) NOT NULL DEFAULT (0),
	[PurDocStd] [char](1) NULL,
	[ASPdocpath] [varchar](100) NULL,
	[AlertPODate] [varchar](1) NULL,
	[MasterDeletion] [varchar](1) NOT NULL DEFAULT ('N'),
	[JobOrderCaption] [varchar](25) NULL,
	[ScriptUpdatedOn] [datetime] NULL,
	[ProdPrgRndOff] [char](1) NULL,
	[SelKeyCode] [int] NOT NULL DEFAULT (113),
	[GotoNxtCntl] [bit] NOT NULL DEFAULT (0),
	[markupstockid] [int] NULL,
	[GENDESCNEEDED] [bit] NOT NULL DEFAULT (0),
	[ChkQltyIssue] [char](1) NULL,
	[ChkIssueStock] [char](1) NOT NULL DEFAULT ('N'),
	[InwardNoMust] [char](1) NOT NULL DEFAULT ('N'),
	[ChkGRNAllowance] [varchar](1) NOT NULL DEFAULT ('N'),
	[ChkPOAllowance] [varchar](1) NOT NULL DEFAULT ('N'),
	[ALLOWEXCSQTYAGAINSTORDER] [char](1) NOT NULL DEFAULT ('N'),
	[IsBuyDateChecked] [char](1) NOT NULL DEFAULT ('N'),
	[ChkBuyDate] [datetime] NULL,
	[ChkNominatedSupplier] [char](1) NOT NULL DEFAULT ('N'),
	[ShowBuyerLookUp] [char](1) NOT NULL DEFAULT ('N'),
	[ChkSimilarPONumber] [varchar](1) NOT NULL DEFAULT ('N'),
	[AllowDamageStk] [varchar](1) NOT NULL DEFAULT ('N'),
	[IndividualProcNum] [varchar](1) NOT NULL DEFAULT ('N'),
	[ValidateGsminPostBom] [varchar](1) NOT NULL DEFAULT ('N'),
	[LotNoPrefix] [varchar](6) NULL,
	[LotNoStartFrom] [int] NULL,
	[MerchandiserWiseOrder] [char](1) NOT NULL DEFAULT ('N'),
	[ChkQltyInGrn] [char](1) NOT NULL DEFAULT ('N'),
	[DefaultSupplierId] [int] NULL,
	[AllowonlyFDLStkInCutIss] [char](1) NOT NULL DEFAULT ('N'),
	[AllowSaveInOrdCumIssInCutt] [char](1) NOT NULL DEFAULT ('N'),
	[ChkRateInGenPO] [char](1) NOT NULL DEFAULT ('N'),
	[AllowonlyCDLStkInSewIss] [char](1) NOT NULL DEFAULT ('N'),
	[ShowProfitLossInBudgetQry] [char](1) NOT NULL DEFAULT ('N'),
	[ValidateIOinSewingRecpt] [char](1) NOT NULL DEFAULT ('N'),
	[CostAppCheckForSample] [char](1) NOT NULL DEFAULT ('N'),
	[ChkManualQtyAlwnceinWrkOrder] [char](1) NOT NULL DEFAULT ('N'),
	[ChkPrgQtyForStkTransfer] [char](1) NOT NULL DEFAULT ('N'),
	[ChkInvAppforBillPass] [char](1) NOT NULL DEFAULT ('N'),
	[ValidateIOinProdGenRecpt] [char](1) NOT NULL DEFAULT ('N'),
	[ValidateStkInoutInPO] [char](1) NOT NULL,
	[GenSampleDespno] [char](1) NOT NULL DEFAULT ('N'),
	[ValidateAppForOpenPrg] [char](1) NOT NULL DEFAULT ('N'),
	[ValidateQuotAppRateInBudget] [char](1) NOT NULL DEFAULT ('N'),
	[AllowActiveInSuplierMas] [char](1) NOT NULL DEFAULT ('Y'),
	[validateReqDateinPO] [char](1) NOT NULL DEFAULT ('N'),
	[ValidateStkOnlyOutInPO] [char](1) NOT NULL DEFAULT ('N'),
	[FinYearCode] [varchar](1) NULL,
	[TallyPath] [varchar](100) NOT NULL DEFAULT (''),
	[TallyExport] [varchar](1) NOT NULL DEFAULT ('N'),
	[ChkCustomerContour] [char](1) NOT NULL DEFAULT ('N'),
	[GenLotNoInProcess] [varchar](2) NOT NULL DEFAULT ('PO'),
	[FromDays] [int] NOT NULL DEFAULT (30),
	[chkQltyInGeneralGRN] [varchar](1) NOT NULL DEFAULT ('N'),
	[ChkAutoLoadInCutRecpt] [varchar](1) NOT NULL DEFAULT ('N'),
	[chkTermsConditionsInPO] [varchar](1) NOT NULL DEFAULT ('N'),
	[ProcessOrderComboFilter] [varchar](1) NOT NULL DEFAULT ('N'),
	[ShowFabricOption] [varchar](1) NOT NULL DEFAULT ('N'),
	[AllowOrderGrouping] [char](1) NOT NULL DEFAULT ('N'),
	[IncludeCuttingInGenProd] [varchar](1) NOT NULL DEFAULT ('N'),
	[ValidatePOApproval] [varchar](1) NOT NULL DEFAULT ('N'),
	[ValidateBudgetRateInCuttingOrder] [varchar](1) NOT NULL DEFAULT ('N'),
	[ValidateBudgetRateGenProdIssue] [varchar](1) NOT NULL DEFAULT ('N'),
	[ValidateBudgetRateSewing] [varchar](1) NOT NULL DEFAULT ('N'),
	[ValidateBudgetRateInLineIss] [varchar](1) NOT NULL DEFAULT ('N'),
	[EvaluteIssueReceiptUOMInProdSummaryRpt] [varchar](1) NOT NULL DEFAULT ('N'),
	[AllowProgPrgPosting] [char](1) NOT NULL DEFAULT ('N'),
	[ASP_ActualPath] [varchar](100) NOT NULL DEFAULT (''),
	[pur_managerid] [int] NULL,
	[KGS_UOM] [int] NULL,
	[PCS_UOM] [int] NULL,
	[AssortColumnCaption] [varchar](8) NOT NULL DEFAULT ('ASST.NO'),
	[EMailSMSRefresh] [int] NOT NULL DEFAULT (1),
	[ShowPrintToolBarInMis] [char](1) NULL DEFAULT ('Y'),
	[AlertBeforeDays] [int] NOT NULL DEFAULT (0),
	[ApplicationPath] [varchar](256) NOT NULL DEFAULT (''),
	[Merchand_OnlyTA] [varchar](1) NOT NULL DEFAULT ('Y'),
	[ShowAdditional_InFabricPlanning] [varchar](1) NOT NULL DEFAULT ('N'),
	[WinPrintFont] [varchar](20) NOT NULL DEFAULT ('sans-serif'),
	[WinPrintFontSize] [varchar](4) NOT NULL DEFAULT ('11px'),
	[PrintFooterAtEnd] [varchar](1) NULL,
	[RestrictPrinting] [int] NULL,
	[OrderProcess_ShowMerchandiserOnly] [varchar](1) NOT NULL DEFAULT ('N'),
	[PrintTINNo] [varchar](1) NULL,
	[LoadTAMonitorOnStartup] [varchar](1) NOT NULL DEFAULT ('Y'),
	[ShowMerchandiserTeamwiseOrdersOnly] [varchar](1) NOT NULL DEFAULT ('N'),
	[RejectAlertPercentage] [int] NULL,
	[IsShipmentwiseAllowance] [varchar](1) NOT NULL DEFAULT ('N'),
	[chkgeninout] [char](1) NOT NULL DEFAULT ('N'),
	[joborderallowance] [char](1) NOT NULL DEFAULT ('Y'),
	[AlertForStockAge] [bit] NOT NULL DEFAULT (0),
	[POApproval] [bit] NULL DEFAULT (null),
	[ValidateJobOrderApproval] [bit] NULL DEFAULT (null),
	[ValidateProcessOrderApproval] [bit] NULL,
	[ValidateStore] [bit] NULL DEFAULT (0),
	[AlertProcessOrderEMail] [bit] NULL DEFAULT (0),
	[ValidateProcessStore] [bit] NULL DEFAULT (0),
	[ChkBOMStoreIssue] [bit] NULL,
	[IncludeSewingInGenProd] [bit] NULL,
	[ValidateProductionStore] [bit] NULL DEFAULT (0),
	[ChkStyleColor] [bit] NULL DEFAULT (0),
	[CostProCheckSample] [char](1) NULL DEFAULT ('N'),
	[ShipmentwiseProduction] [bit] NULL DEFAULT (0),
	[ChkSISProdAccIssue] [bit] NULL,
	[StylewiseJoborder] [bit] NULL,
	[LicencecompanyID] [char](50) NULL,
	[LicenceExpiryDate] [char](100) NULL,
	[LicenceType] [char](1) NULL,
	[Licenceusers] [char](50) NULL,
	[ASSTYEAR] [varchar](50) NULL,
	[ProductionProgramAllowance] [bit] NULL,
	[ALLOWMANUALPRODUCTIONPROGRAM] [bit] NULL,
	[AllowCompanyPrefixDup] [bit] NULL,
	[CheckGRNInvoiceNo] [bit] NULL,
	[ChkInvoiceAgainstGrn] [bit] NULL,
	[ValidatePlanningApproval] [bit] NULL,
	[SupplierLotPrefix] [varchar](6) NULL,
	[ValidateZeroRateInReProcess] [bit] NULL,
	[ValidateProgramSize] [bit] NULL,
	[ValidateCompanyStore] [bit] NULL,
	[EnableTransactionDate] [bit] NULL,
	[ValidateIssQtyonlyforProcRetrn] [bit] NULL,
	[OpenPrgProcessAllowance] [bit] NULL,
	[EnableJJFormInProcess] [bit] NULL,
	[CheckSupplierBudgetinPurchase] [bit] NULL,
	[CheckSupplierBudgetinProcess] [bit] NULL,
	[FINYEAR] [varchar](50) NULL,
	[GenerateFinYearNumber] [bit] NULL,
	[checkBillsToInvoiceEntry] [bit] NULL DEFAULT (0),
	[DisableProdTranDate] [bit] NULL,
	[ChkProInvoiceAgainstQuality] [bit] NULL,
	[PoUnit] [bit] NULL,
	[UpdateActRateFromInvRate] [char](1) NULL,
	[DontAllowProcessProgram] [char](1) NULL,
	[EnableAutoMailforPO] [char](1) NULL,
	[UnitStockUpdation] [char](1) NULL,
	[ChkcuttingAllowance] [bit] NULL DEFAULT (0),
	[ChkSewingAllowance] [bit] NULL DEFAULT (0),
	[CuttingAllowanceQty] [numeric](8, 2) NULL DEFAULT (0),
	[SewingAllowanceQty] [numeric](8, 2) NULL DEFAULT (0),
	[ChkDespatch] [bit] NULL DEFAULT (0),
	[DespatchQty] [numeric](8, 2) NULL DEFAULT (0),
	[chkItemComp] [char](1) NULL,
	[ShowDateTime] [varchar](1) NULL,
	[AllowGMSPieceinCutReceipt] [char](1) NULL,
	[ChkListIteminPurchase] [char](1) NULL,
	[ChkPOPrintingRestrict] [int] NULL,
	[ChkQltyInProcessGRN] [char](1) NULL,
	[ChkInvoiceagainstProcessGRN] [bit] NULL,
	[GPOApproval] [bit] NULL,
	[CHEKEXCLUDEINVOICE] [bit] NULL,
	[CHEKEXCLUDE_PRN_INVOICE] [bit] NULL,
	[AllowExcessinBuyerDispatch] [char](1) NULL,
	[ManualPostPurchaseInvoiceActuals] [char](1) NULL,
	[CuttingOrderAllowanceQty] [numeric](14, 3) NULL,
	[ChkCutOrdAllowance] [bit] NULL,
	[ChkAppReqForAccPUR] [char](1) NULL,
	[BoxItemStock] [bit] NULL,
	[chkStoreIssueSplNo] [bit] NULL,
	[ValidateZeroRateInReProduction] [varchar](1) NULL,
	[ShwApproveinOrderStatus] [varchar](1) NULL,
	[showStyleInOrderPro] [varchar](1) NULL,
	[validatebomqtyindelivery] [bit] NULL,
	[enablejjforminproduction] [varchar](1) NULL,
	[EnableJJFormInStores] [bit] NULL,
	[ValidateInvoiceMarkuprate] [char](1) NULL,
	[chkitemremarks] [varchar](1) NULL,
	[chkissueprintlocation] [char](1) NULL,
	[allowexcesspurchaseinvoiceqty] [char](1) NULL,
	[validategrnmarkuprate] [char](1) NULL,
	[chkblankdate] [char](1) NOT NULL DEFAULT ('N'),
	[defaultappload] [char](1) NOT NULL DEFAULT ('N'),
	[chkOrd_Sample] [int] NOT NULL  DEFAULT ((0)),
	[ChkPurInvRateWithBudgetRate] [int] NOT NULL  DEFAULT ((0)),
	[chkPrsGrnRateInvRate] [int] NOT NULL  DEFAULT ((0)),
	[chkProdGrnRateInvRate] [int] NOT NULL  DEFAULT ((0)),
	[ValidateDCTemplate] [int] NULL,
	[CHKAllowExcessProductionInvoice] [bit] NULL,
	[chkPoprintFooter] [char](1) NULL,
	[chkValidateSupplierApproval] [bit] NULL,
	[ValidateMarkupRateinSubStoreReceipt] [bit] NULL,
	[validateSupplierApproval] [varchar](1) NULL,
	[chkValidateVerifyBeforeApproval] [varchar](1) NULL,
	[chk_poeditloadwithoutorder] [char](1) NULL,
	[ChkPoBalHighlighting] [char](1) NULL,
	[CHKPRODGRNQTYINVQTY] [char](1) NULL,
	[validateStyleschedulesize] [char](1) NULL,
	[ChkSupTinPanValidation] [char](1) NULL,
	[ValidateHSNCode] [char](1) NULL,
	[validateGSTENTRY] [char](1) NULL,
	[chkpoprintGST] [char](1) NULL,
	[ChkPoprintGSTSPLREQ] [char](1) NULL,
	[ValidateGstEntrySplReq] [char](1) NULL,
	[CHKBUNDLENOVALIDATION] [bit] NULL,
	[ValidateProcsGSTEntry] [char](1) NULL,
	[ValidateProdnGSTEntry] [char](1) NULL,
	[ValidateProdncompGSTEntry] [char](1) NULL,
	[Validate_InvoiceRateChange] [int] NULL,
	[CHKLOGGENERLAACCPLAAING] [char](1) NULL,
	[Validatecuttingorderissue] [char](1) NULL,
	[chkAllowanceValidationAccPlanning] [bit] NULL,
	[LotNoMustInGeneralProduction] [int] NULL,
	[chkAllowOrderedTrims] [int] NULL,
	[chkpoprintgstspreq] [char](1) NULL,
	[ChkProductionInterlPrintLog] [bit] NULL,
	[chkPoAgainstIndent] [char](1)NULL,
	[ValidateGafiCharges] [char](1)NULL,
	[chkGSTAgainstHSNCode] [char](1)NULL,
	[EnableAssortDetailsRate] [char](1)NULL,
	[BuyerWiseCosting] [char] NOT NULL  DEFAULT (('N')), 
	[EnableJobOrderRate] [char](1)NULL,
	[BuyerWiseDetailsList] [char](1)NULL,
	--FOREIGN KEY([DefaultSupplierId]) REFERENCES [dbo].[Supplier] ([SupplierId]),
	-- FOREIGN KEY([KGS_UOM]) REFERENCES [dbo].[Unit_of_measurement] ([UomId]),
	-- CONSTRAINT [fk_mispath_inrid] FOREIGN KEY([Inrid]) REFERENCES [dbo].[Currency] ([CurrencyId]),
	-- CONSTRAINT [Fk_PCS_UOM] FOREIGN KEY([PCS_UOM]) REFERENCES [dbo].[Unit_of_measurement] ([UomId]),
	CONSTRAINT [Chk_ChkAutoLoadInCutRecpt] CHECK  (([ChkAutoLoadInCutRecpt] = 'Y' or [ChkAutoLoadInCutRecpt] = 'N')),
	CONSTRAINT [Chk_MISPath_EvaluteIssueReceiptUOMInProdSummaryRpt] CHECK  (([EvaluteIssueReceiptUOMInProdSummaryRpt] = 'Y' or [EvaluteIssueReceiptUOMInProdSummaryRpt] = 'N')),
	CONSTRAINT [Chk_MIsPath_IncludeCuttingInGenProd] CHECK  (([IncludeCuttingInGenProd] = 'N' or [IncludeCuttingInGenProd] = 'Y')),
	CONSTRAINT [Chk_Mispath_OrderProcess_ShowMerchandiserOnly] CHECK  (([OrderProcess_ShowMerchandiserOnly] = 'N' or [OrderProcess_ShowMerchandiserOnly] = 'Y')),
	CONSTRAINT [Chk_MISPath_PrintFooterAtEnd] CHECK  (([PrintFooterAtEnd] = 'Y' or [PrintFooterAtEnd] = 'N')),
	CONSTRAINT [Chk_MISPath_PrintTINNo] CHECK  (([PrintTINNo] = 'Y' or [PrintTINNo] = 'N')),
	CONSTRAINT [Chk_MISPath_ValidateBudgetRateGenProdIssue] CHECK  (([ValidateBudgetRateGenProdIssue] = 'Y' or [ValidateBudgetRateGenProdIssue] = 'N')),
	CONSTRAINT [Chk_MISPath_ValidateBudgetRateInCuttingOrder] CHECK  (([ValidateBudgetRateInCuttingOrder] = 'Y' or [ValidateBudgetRateInCuttingOrder] = 'N')),
	CONSTRAINT [Chk_MISPath_ValidateBudgetRateInSewing] CHECK  (([ValidateBudgetRateSewing] = 'Y' or [ValidateBudgetRateSewing] = 'N')),
	CONSTRAINT [Chk_MISPath_ValidateBudgetRateInLineIss] CHECK  (([ValidateBudgetRateInLineIss] = 'Y' or [ValidateBudgetRateInLineIss] = 'N')),
	CONSTRAINT [Chk_ProcessOrderComboFilter] CHECK  (([ProcessOrderComboFilter] = 'Y' or [ProcessOrderComboFilter] = 'N')),
	CONSTRAINT [Chk_RestrictPrinting_Mispath] CHECK  (([RestrictPrinting] > 0)),
	CONSTRAINT [Chk_ShowFabricOption] CHECK  (([ShowFabricOption] = 'Y' or [ShowFabricOption] = 'N')),
	CONSTRAINT [chk_TermsConditionsInPO] CHECK  (([chkTermsConditionsInPO] = 'Y' or [chkTermsConditionsInPO] = 'N')),
	CHECK  (([ShowMerchandiserTeamwiseOrdersOnly] = 'N' or [ShowMerchandiserTeamwiseOrdersOnly] = 'Y')),
	CONSTRAINT [ck_mispath_allowaordergrouping] CHECK  (([AllowOrderGrouping] = 'Y' or [AllowOrderGrouping] = 'N')), 
    CONSTRAINT [PK_MisPath] PRIMARY KEY ([MispathId])
	


)
