CREATE TABLE [dbo].[Cutting_Recpt_Qlty]
(
	[CuttingQltyId] INT IDENTITY(1,1) NOT NULL,
	[CuttingRecptId] [int] NULL,
	[QualityId] [int] NULL,
	[Description] [varchar](100) NOT NULL,
	CONSTRAINT [PK_CuttingReceptquaid] PRIMARY KEY ([CuttingQltyId]),
	CONSTRAINT [FK_Programquarefid] FOREIGN KEY ([QualityId]) REFERENCES [ProgramQuality]([Qualityid]),
)
