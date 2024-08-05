CREATE TABLE [dbo].[TermMas]
(
	[TermId] [int] IDENTITY(1,1) NOT NULL primary key,
	[TermName] [varchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL DEFAULT ((1))
)
