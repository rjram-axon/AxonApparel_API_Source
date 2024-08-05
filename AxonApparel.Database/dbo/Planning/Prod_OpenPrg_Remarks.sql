CREATE TABLE [dbo].[Prod_OpenPrg_Remarks]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[ProdPrgId] [int] NULL,
	[Job_Ord_No] [varchar](20) NULL,
	[Prog_Seq_No] [int] NULL,
	[Remarks] [varchar](1000) NULL
)
