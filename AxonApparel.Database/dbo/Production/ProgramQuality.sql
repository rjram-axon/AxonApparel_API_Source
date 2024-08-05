CREATE TABLE [dbo].[ProgramQuality]
(
	[Qualityid] INT IDENTITY(1,1) NOT NULL,
	[QualityTitle] [varchar](50) NULL,
	[Description] [varchar](200) NULL,
	[Processid] [int] NULL,
	[IsActive] [bit] NOT NULL,
	CONSTRAINT [PK_ProgramQualityid] PRIMARY KEY ([Qualityid]),
	--CONSTRAINT [UK_QualityTitle] UNIQUE([QualityTitle]),
	CONSTRAINT [FK_processrefid] FOREIGN KEY ([Processid]) REFERENCES [Process]([ProcessId]),
)
