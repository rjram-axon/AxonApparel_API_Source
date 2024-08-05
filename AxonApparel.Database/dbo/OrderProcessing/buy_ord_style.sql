CREATE TABLE [dbo].[buy_ord_style]
(	
	[order_no] [varchar](20) NOT NULL,
	[Styleid] [int] NOT NULL,
	[categoryid] [int] NULL,
	[quantity] [numeric](9, 0) NULL,
	[price] [numeric](15, 5) NULL,
	[value] [numeric](15, 5) NULL,
	[job_qty] [numeric](8, 0) NOT NULL,
	[StyleRowid] [int] IDENTITY(1,1) NOT NULL,
	[LongDesc] [varchar](2000) NULL,
	[cost_estimated] [bit] NOT NULL,
	[styleentdate] [datetime] NULL,	
	[ProductionQty] [numeric](9, 0) NULL,	
	[Amend] [varchar](1) NULL,
	[Yarn_Amend] [varchar](1) NULL,
	[Acc_Amend] [varchar](1) NULL,
	[Pack_Amend] [varchar](1) NULL,
	[Despatch_Closed] [varchar](1) NULL,
	[despatch_qty] [numeric](8, 0) NULL,	
	[cutG_Amend] [varchar](1) NOT NULL,
	[Grouped_StyleID] [int] NOT NULL,
	[Grouped] [bit] NOT NULL,
	[WORKORDER] [varchar](20) NULL,
	[Company_Unitid] [int] NULL,
	[Enquiryid] [int] NULL,
	[BuyerArt] [varchar](40) NULL,	
	[OpenPrgAmend] [varchar](1) NOT NULL,
	[SampleStyleId] [int] NULL,	
	[SeasonId] [int] NULL,
	[GarmentGsm] [int] NULL,
	[ProcessUnitID] [int] NULL,
	[CreatedBy] [int] NULL,
	[IsSeQPrgmLock] [bit] NULL,
	[prs_loss] [numeric](5, 0) NULL,
	[mis_tmArchive] [int] NOT NULL,
	[mis_type] [int] NOT NULL,
	[Cancel] [int] NULL,
    [OrderType] [varchar] (1)NULL,
	AllowancePer int NULL,
	[CurrencyId] [int] NULL,
	[Exchange] [numeric](15, 5) NULL,
	[CAD_Weight] [numeric](9, 2) NULL,
	[CAD_Percentage] [numeric](9, 2) NULL,
	[PA] [char](1) NULL DEFAULT ('P'),
	[Description] [varchar](100) NULL,	
	Modifiedby int null,
	Modifieddate datetime null,
	CONSTRAINT [FK_Stylecons] FOREIGN KEY ([Styleid]) REFERENCES [StyleHeader]([StyleId]),
	CONSTRAINT [Fk_buy_ord_Style_CurrencyId] FOREIGN KEY([CurrencyId])REFERENCES [dbo].[currency] ([currencyId]),
	CONSTRAINT [Pk_StyleRowid] PRIMARY KEY CLUSTERED 
(
	[StyleRowid] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
 CONSTRAINT [uq_buy_ord_style_orderStyle] UNIQUE NONCLUSTERED 
(
	[order_no] ASC,
	[Styleid] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[buy_ord_style] ADD  CONSTRAINT [df_buy_ord_style_value]  DEFAULT (0) FOR [value]
GO

ALTER TABLE [dbo].[buy_ord_style] ADD  CONSTRAINT [df_buy_ord_style_job_qty]  DEFAULT (0) FOR [job_qty]
GO

ALTER TABLE [dbo].[buy_ord_style] ADD  CONSTRAINT [DF__buy_ord_s__cost___6E6149E0]  DEFAULT (0) FOR [cost_estimated]
GO

ALTER TABLE [dbo].[buy_ord_style] ADD  DEFAULT ('N') FOR [Amend]
GO

ALTER TABLE [dbo].[buy_ord_style] ADD  DEFAULT ('N') FOR [Yarn_Amend]
GO

ALTER TABLE [dbo].[buy_ord_style] ADD  DEFAULT ('N') FOR [Acc_Amend]
GO

ALTER TABLE [dbo].[buy_ord_style] ADD  DEFAULT ('N') FOR [Pack_Amend]
GO

ALTER TABLE [dbo].[buy_ord_style] ADD  DEFAULT ('N') FOR [Despatch_Closed]
GO

ALTER TABLE [dbo].[buy_ord_style] ADD  DEFAULT ('N') FOR [cutG_Amend]
GO

ALTER TABLE [dbo].[buy_ord_style] ADD  DEFAULT (0) FOR [Grouped_StyleID]
GO

ALTER TABLE [dbo].[buy_ord_style] ADD  DEFAULT (0) FOR [Grouped]
GO

ALTER TABLE [dbo].[buy_ord_style] ADD  DEFAULT ('N') FOR [OpenPrgAmend]
GO

ALTER TABLE [dbo].[buy_ord_style] ADD  DEFAULT (0) FOR [GarmentGsm]
GO

ALTER TABLE [dbo].[buy_ord_style] ADD  DEFAULT ((0)) FOR [mis_tmArchive]
GO

ALTER TABLE [dbo].[buy_ord_style] ADD  DEFAULT ((0)) FOR [mis_type]
GO
