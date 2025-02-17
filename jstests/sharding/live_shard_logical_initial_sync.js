/**
 * Tests that sharding state is properly initialized on new shard members that were added into live
 * shards using logical initial sync.
 */

(function() {
"use strict";

load("jstests/sharding/libs/sharding_state_test.js");

const st = new ShardingTest({config: 1, shards: {rs0: {nodes: 1}}});
const rs = st.rs0;

const newNode = ShardingStateTest.addReplSetNode({replSet: rs, serverTypeFlag: "shardsvr"});

jsTestLog("Checking sharding state before failover.");
ShardingStateTest.checkShardingState(st);

jsTestLog("Checking sharding state after failover.");
ShardingStateTest.failoverToMember(rs, newNode);
ShardingStateTest.checkShardingState(st);

st.stop();
})();
