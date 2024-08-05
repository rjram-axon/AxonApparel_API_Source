CREATE TABLE [dbo].[Box_Con_Mas]
(
	[BoxConMasId] [int] IDENTITY(1,1) NOT NULL primary key,
	[BoxConNo] [varchar](20) NULL,
	[BoxConDate] [datetime] NULL,
	[Remarks] [varchar](1500) NULL,
	[OrderNo] [varchar](20) NULL,
	[CreatedBy] [int] NULL,
	[CompanyId][int] Null,
	[CompanyUnitId][int] Null,
	[StoreId][int] Null,
	[SktConNo] [varchar](50) NULL,
	OType char(1),
	SktConMasId int,
	CONSTRAINT [Fk_Box_Con_Mas_CompanyId] FOREIGN KEY([companyid]) REFERENCES [dbo].[Company] ([CompanyId]),
	CONSTRAINT [Fk_Box_Con_Mas_CompanyUnitId] FOREIGN KEY([companyunitid]) REFERENCES [dbo].[CompanyUnit] ([Id]),
	CONSTRAINT [Fk_Box_Con_Mas_StoreId] FOREIGN KEY([StoreId]) REFERENCES [dbo].[StoreUnit] ([StoreUnitId])
)
