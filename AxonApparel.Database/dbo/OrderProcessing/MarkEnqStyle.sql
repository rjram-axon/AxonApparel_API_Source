CREATE TABLE [dbo].[MarkEnqStyle]
(
  
    [EnquiryStyleId] [int] IDENTITY(1,1) NOT NULL,
	[EnquiryID] [int] NOT NULL,
	[StyleId] [int] NOT NULL,
	[BuyerStyle] [varchar](50) NOT NULL,
	[StyleDesc] [varchar](250) NOT NULL,
	[QuotaCateId] [int] NULL,
	[Quantity] [int] NOT NULL,
	[GUomId] [int] NOT NULL,
	[GUomConv] [int] NOT NULL,
	[ContactPerson] [varchar](50) NOT NULL,
	[ShipModeId] [int] NULL,
	[Department] [varchar](30) NOT NULL,
	[Season] [varchar](30) NOT NULL, 
    CONSTRAINT [PK_MarkEnqStyle] PRIMARY KEY ([EnquiryStyleId]), 
    CONSTRAINT [FK_MarkEnqStyle_Category] FOREIGN KEY ([QuotaCateId]) REFERENCES [Category]([CategoryId]),
	CONSTRAINT [FK_MarkEnqStyle_Garment_Uom] FOREIGN KEY ([GUomId]) REFERENCES [Garment_Uom]([GUomId]),
	CONSTRAINT [FK_MarkEnqStyle_MarkEnqMas] FOREIGN KEY ([EnquiryID]) REFERENCES [MarkEnqMas]([EnquiryID]),
	CONSTRAINT [FK_MarkEnqStyle_Mode_Of_Shipment] FOREIGN KEY ([ShipModeId]) REFERENCES [Mode_Of_Shipment]([Mode_of_Shipmentid]),
	CONSTRAINT [FK_MarkEnqStyle_Style] FOREIGN KEY ([StyleId]) REFERENCES [StyleHeader]([StyleId])
)
