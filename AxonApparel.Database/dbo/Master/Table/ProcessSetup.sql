CREATE TABLE [dbo].[ProcessSetup]
(

	[ProcessSetupid] [int] IDENTITY(1,1) NOT NULL,
	[Processid] [int] NOT NULL,
	[CuttingorSewing] [char](1) NULL, 
    CONSTRAINT [PK_ProcessSetup] PRIMARY KEY ([ProcessSetupid]), 
    CONSTRAINT [FK_ProcessSetup_Process] FOREIGN KEY ([Processid]) REFERENCES [Process]([Processid]) 
)

GO

CREATE INDEX [IX_ProcessSetup_Column] ON [dbo].[ProcessSetup] ([ProcessSetupid])
