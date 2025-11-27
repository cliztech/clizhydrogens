#########################################
# SKILL POLICIES (global)
#########################################
[skills]
registry = "skills/registry.yaml"
enforce_skills = true            # prefer skills over ad-hoc code
cache_dir = ".skills/cache"      # idempotent outputs
dataset_dir = ".skills/datasets" # fixtures for tests

#########################################
# EXECUTIVE LAYER (equipped skills + sandbox)
#########################################

[[agents]]
id = "pm.core"
# ...existing fields...
equipped_skills = ["devops.ci","ops.retros","ops.autohire"]
sandbox = { cpu="1", mem_mb=1024, fs_ro=[".github","skills"], fs_rw=["workspace","reports"] }

[[agents]]
id = "supervisor.dev"
# ...existing fields...
equipped_skills = ["shopify.build","qa.a11y","seo.jsonld","ux.checkout"]
sandbox = { cpu="2", mem_mb=2048, fs_ro=["skills","config.toml"], fs_rw=["app","reports"] }

[[agents]]
id = "supervisor.design"
# ...existing fields...
equipped_skills = ["image.neon-poster","brand.audit"]
sandbox = { cpu="1", mem_mb=1024, fs_ro=["skills"], fs_rw=["assets","reports"] }

[[agents]]
id = "qa.core"
# ...existing fields...
equipped_skills = ["qa.a11y","qa.perf","qa.security"]
gate_policy = { block_on_fail=true, create_fix_pr=true }
sandbox = { cpu="1", mem_mb=1024, fs_ro=["skills",".github"], fs_rw=["reports"] }

#########################################
# SUB-AGENTS (specialists bound to skills)
#########################################

[[agents]]
id = "sub.shopify.scaffold"
# ...existing fields...
equipped_skills = ["shopify.build"]
health_check = "scripts/skills/probe_shopify.sh"
sandbox = { cpu="2", mem_mb=2048, fs_ro=["skills"], fs_rw=["app","reports"] }

[[agents]]
id = "sub.seo.schema"
# ...existing fields...
equipped_skills = ["seo.jsonld"]
sandbox = { cpu="1", mem_mb=512, fs_ro=["skills"], fs_rw=["app","reports"] }

[[agents]]
id = "sub.qa.a11y"
# ...existing fields...
equipped_skills = ["qa.a11y"]
sandbox = { cpu="1", mem_mb=512, fs_ro=["skills"], fs_rw=["reports"] }

[[agents]]
id = "sub.image.neon"
# ...existing fields...
equipped_skills = ["image.neon-poster"]
sandbox = { cpu="1", mem_mb=1024, fs_ro=["skills"], fs_rw=["assets","reports"] }
