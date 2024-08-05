CREATE TABLE [dbo].[Prod_Iss_Qlty]
(
	[ProdIssQltyid] INT IDENTITY(1,1) NOT NULL,
	[ProdIssueid] [int] NULL,
	[Qualityid] [int] NULL,
	[Description] [varchar](100) NULL,
	CONSTRAINT [PK_ProdqltyIssQltyid] PRIMARY KEY ([ProdIssQltyid]),
	CONSTRAINT [FK_ProdqltyIssMasRefid] FOREIGN KEY ([ProdIssueid]) REFERENCES [Prod_iss_Mas](ProdIssueId),
	CONSTRAINT [FK_ProdqltyRefid] FOREIGN KEY ([Qualityid]) REFERENCES [ProgramQuality]([Qualityid]),

)
