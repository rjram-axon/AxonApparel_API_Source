﻿CREATE TABLE [dbo].[Cutting_Return_det]
(
	[CuttingReturnDetId] INT IDENTITY(1,1) NOT NULL,
	[CuttingReturnId] [int] NULL,
	[CuttingIssueDetId] [int] NULL,
	[itemid] [int] NULL,
	[colorid] [int] NULL,
	[sizeid] [int] NULL,
	[ReturnQty] [numeric](14, 3) NULL Default('0'),
	[LossQty] [numeric](14, 3) NULL Default('0'),
	[SecQty] [numeric](14, 3) NULL Default('0'),
	[CuttingIssueStockid] [int] NULL,
	[lotNo] [varchar](15) NULL Default(''),
	CONSTRAINT [PK_CuttinReturnRetid] PRIMARY KEY ([CuttingReturnDetId]),
	CONSTRAINT [Cutting_Return_det_Colorid] FOREIGN KEY ([colorid]) REFERENCES [Color]([Colorid]),
	CONSTRAINT [Cutting_Return_det_IssueStockid] FOREIGN KEY ([CuttingIssueStockid]) REFERENCES [Cutting_Issue_Stock]([CuttingIssueStockId]),
	CONSTRAINT [Cutting_Return_det_ReturnMasid] FOREIGN KEY ([CuttingReturnId]) REFERENCES [Cutting_Return_Mas]([CuttingReturnId]),
	CONSTRAINT [Cutting_Return_det_CuttingIssueDetid] FOREIGN KEY ([CuttingIssueDetId]) REFERENCES [Cutting_Issue_Det]([CuttingIssueDetId]),
	CONSTRAINT [Cutting_Return_det_Itemid] FOREIGN KEY ([itemid]) REFERENCES [Item]([itemId]),
	CONSTRAINT [Cutting_Return_det_Sizeid] FOREIGN KEY ([sizeid]) REFERENCES [size]([sizeId]),
)