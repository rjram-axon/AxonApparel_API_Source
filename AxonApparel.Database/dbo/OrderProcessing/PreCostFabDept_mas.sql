CREATE TABLE [dbo].[PreCostFabDept_mas](
	[PreCostFabDeptmasid] [int] Primary key IDENTITY(1,1) NOT NULL ,
	[Buyerid] [int] NULL,
	[Styleid] [int] NULL,
	[Stylerowid] [int] NULL,
	[Entrydate] [datetime] NULL,
	[Bmasid] [int] NULL FOREIGN KEY([Bmasid])
    REFERENCES [dbo].[Buy_Ord_Mas] ([Buy_Ord_MasId]),
	)