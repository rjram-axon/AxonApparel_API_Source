CREATE TABLE [dbo].[Buy_ord_Measuremas]
(
	[MeasureMasId] [int] IDENTITY(1,1) NOT NULL,
	[MeasureDate] [datetime] NULL,
	[OrderNo] [varchar](20) NULL,
	[BuyMasId] int Null,
	[Remarks] [varchar](500) NULL,
	[StyleRowid] [int] NULL,
	[inchORcms] [char](1) NULL,
	[TemplateName] [varchar](50) NULL,
	[AMEND] [varchar](1) NOT NULL DEFAULT ('N'), 
	[CheckIns] [char](1) NULL,
    CONSTRAINT [PK_Buy_ord_Measuremas] PRIMARY KEY ([MeasureMasId]), 
    CONSTRAINT [FK_Buy_ord_Measuremas_BuyMasId] FOREIGN KEY ([BuyMasId]) REFERENCES [buy_ord_mas]([Buy_Ord_MasId]) ,
	 CONSTRAINT [FK_Buy_ord_Measuremas_StyleRowid] FOREIGN KEY ([StyleRowid]) REFERENCES [buy_ord_style]([StyleRowid]), 
    CONSTRAINT [CK_Buy_ord_Measuremas_inchORcms] CHECK (([inchORcms] = 'I' or [inchORcms] = 'C')) 
)
